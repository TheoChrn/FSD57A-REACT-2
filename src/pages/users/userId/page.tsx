import { Avatar } from "@/components/avatar";
import { Loading } from "@/components/loading";
import { API_URL } from "@/lib/utils";
import {
  QueryClient,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { LoaderFunctionArgs, useLoaderData, useNavigation } from "react-router";

export const userDetailQuery = (id: string) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: async () => {
      const user = await axios.get(`${API_URL}/users/${id}`);
      if (!user) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return user;
    },
  });

export const userLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.userId) {
      throw new Error("No user ID provided");
    }
    await queryClient.ensureQueryData(userDetailQuery(params.userId));
    return { userId: params.userId };
  };

export default function User() {
  const { userId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof userLoader>>
  >;

  const { state } = useNavigation();
  const { data } = useSuspenseQuery(userDetailQuery(userId));

  const user: User = data.data;

  if (state === "loading") return <Loading />;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Avatar image="https://i.pravatar.cc/150?u=fake@pravatar.com" {...user} />
    </main>
  );
}
