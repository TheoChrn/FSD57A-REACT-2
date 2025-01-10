import { axiosInstance } from "@/lib/utils";

import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { PiTrash } from "react-icons/pi";
import { Link, redirect } from "react-router";

export const postsQuery = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/posts");
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

export function Posts() {
  const { data } = useSuspenseQuery(postsQuery());

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return axiosInstance.delete(`/posts/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const posts: PopulatedPost[] = data;

  return (
    <div className="px-8">
      {posts.length ? (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <article className="capitalize justify-center" key={post._id}>
                <Link className="font-semibold underline" to={`${post._id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div>{post.body}</div>
                <cite>
                  -{post.userId.first_name} {post.userId.last_name}
                </cite>
                <button
                  className="flex gap-2 items-center border-2 border-red-600 hover:bg-red-600 hover:text-white text-red-600 rounded px-3 py-2 w-fit "
                  onClick={() => mutate(post._id)}
                >
                  <PiTrash size={24} /> DELETE
                </button>
              </article>
            ))}
          </div>
        </>
      ) : (
        <span>No posts were found</span>
      )}
    </div>
  );
}
