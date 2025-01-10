import { axiosInstance } from "@/lib/utils";
import {
  QueryClient,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { PiFloppyDisk } from "react-icons/pi";
import { ActionFunctionArgs, Form, redirect } from "react-router";

export const profileQuery = () =>
  queryOptions({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/user");
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return redirect("/");
          }
          if (error.response?.status === 404) {
            return redirect("/not-found");
          }
        }

        throw new Error("An unexpected error occurred while fetching posts.");
      }
    },
  });

export const profileLoader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData(profileQuery());
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return redirect("/login");
    }

    throw error;
  }
};

export const editProfile =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const updatedData = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
    };

    if (!updatedData.first_name || !updatedData.last_name) return;

    const res = await axiosInstance.put(`/user`, updatedData);

    console.log(res);

    if (res.status >= 200 && res.status < 300) {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    }

    return null;
  };

export default function ProfilePage() {
  const { data } = useSuspenseQuery(profileQuery());

  const user: User = data;

  console.log(user);

  return (
    <main>
      <div className="text-center max-w-screen-lg mx-auto space-y-8 p-8">
        <h1 className="text-4xl">Profile</h1>
        <Form method="post" className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <label className="flex w-full flex-col gap-2">
              FirstName
              <input
                type="text"
                name="firstName"
                required
                defaultValue={user.first_name}
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex w-full  flex-col gap-2">
              Last Name
              <input
                type="text"
                name="lastName"
                required
                defaultValue={user.last_name}
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
          </div>
          <button
            className="inline-flex justify-center gap-2 items-center p-3 rounded border-black border-2 w-52 hover:bg-black/10"
            type="submit"
          >
            Save
            <PiFloppyDisk size={24} />
          </button>
        </Form>
      </div>
    </main>
  );
}
