import { LOCAL_API_URL } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";

export const registerAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const newUser = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { first_name, last_name, email, password } = newUser;

    if (!first_name || !last_name || !email || !password)
      return { ok: false, error: "All fields are required" };

    try {
      const res = await axios.post(`${LOCAL_API_URL}/register`, newUser);

      if (res.status >= 200 && res.status < 300) {
        alert(res.data.message);
        return redirect("/");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 409) {
        return { ok: false, error: "This email is already taken" };
      }
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return null;
  };

export default function RegisterPage() {
  const fetcher = useFetcher();
  return (
    <main>
      <div className=" max-w-screen-lg mx-auto space-y-8 p-8">
        <fetcher.Form method="post" className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <label className="flex w-full flex-col gap-2">
              First Name
              <input
                type="text"
                name="firstName"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              Last Name
              <input
                type="text"
                name="lastName"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              Email
              <input
                type="email"
                name="email"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              Password
              <input
                type="password"
                name="password"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
          </div>
          <button
            className="inline-flex justify-center gap-2 items-center p-3 rounded border-black border-2 w-52 hover:bg-black/10"
            type="submit"
          >
            Sign up
          </button>

          <div>{fetcher.data?.error && <p>{fetcher.data.error}</p>}</div>
        </fetcher.Form>
      </div>
    </main>
  );
}
