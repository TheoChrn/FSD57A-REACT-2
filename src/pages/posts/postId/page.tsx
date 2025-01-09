import { postsQuery } from "@/components/pages/posts/posts";
import { LOCAL_API_URL } from "@/lib/utils";
import {
  QueryClient,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { PiArrowLeft, PiFloppyDisk, PiPencil } from "react-icons/pi";
import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router";

export const postQuery = (id: string) =>
  queryOptions({
    queryKey: ["posts", id],
    queryFn: async () => {
      const posts = await axios.get(`${LOCAL_API_URL}/posts/${id}`);
      if (!posts) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return posts;
    },
  });

export const postLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) throw new Error("No post ID provided");

    await queryClient.ensureQueryData(postsQuery());

    return { postId: id };
  };

export const editPost =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const { id } = params;
    const formData = await request.formData();

    const title = formData.get("title");

    const body = formData.get("body");

    if (!title || !body)
      return { ok: false, error: "title and body are required" };

    const res = await axios.put(`${LOCAL_API_URL}/posts/${id}`, {
      title,
      body,
    });

    if (res.status >= 200 && res.status < 300) {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }

    return { ok: true, error: null };
  };

export default function PostPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { postId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof postLoader>>
  >;

  const fetcher = useFetcher();

  if (fetcher.state === "idle" && fetcher.data?.ok && isEditing) {
    setIsEditing(false);
  }

  const { data } = useSuspenseQuery(postQuery(postId));

  const post: PopulatedPost = data.data;

  return (
    <main>
      <div className=" max-w-screen-lg mx-auto space-y-8 p-8">
        <Link
          to="/posts"
          className="inline-block w-fit py-2 px-3 border border-black rounded text-left"
        >
          <PiArrowLeft size={24} />
        </Link>
        {isEditing ? (
          <fetcher.Form method="post" className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <label className="flex w-full flex-col gap-2">
                Title
                <input
                  type="text"
                  name="title"
                  defaultValue={post.title}
                  required
                  className="border-black border-2 rounded-lg p-3"
                />
              </label>
              <label className="flex w-full  flex-col gap-2">
                Body
                <textarea
                  name="body"
                  required
                  className="border-black border-2 rounded-lg p-3"
                  defaultValue={post.body}
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
          </fetcher.Form>
        ) : (
          <div className="text-center">
            <div className="flex gap-4 justify-center items-center ">
              <h1 className="text-4xl ">Post {post.title}</h1>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <PiPencil size={24} />
                </button>
              )}
            </div>
            <p>{post.body}</p>
          </div>
        )}
      </div>
    </main>
  );
}
