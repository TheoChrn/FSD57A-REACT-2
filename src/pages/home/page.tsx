import { Avatar } from "@/components/avatar";
import { Hello } from "@/components/hello-world";
import { API_URL } from "@/lib/utils";
import {
  QueryClient,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigation } from "react-router";
import { Loading } from "@/components/loading";

export const usersQuery = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const user = await axios.get(`${API_URL}/users`);
      if (!user) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return user;
    },
  });

export const usersLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(usersQuery());
};

export function Home() {
  const { data } = useSuspenseQuery(usersQuery());
  const { state } = useNavigation();

  const users: User[] = data.data;
  if (state === "loading") return <Loading />;

  return (
    <>
      <Hello />
      <div className="mt-12 space-y-8">
        {users.length ? (
          users.map((user, index) => (
            <Link className="block" to={`/users/${user.id}`}>
              <Avatar
                key={index}
                image="https://i.pravatar.cc/150?u=fake@pravatar.com"
                {...user}
              />
            </Link>
          ))
        ) : (
          <span>No users</span>
        )}
      </div>
    </>
  );
}
