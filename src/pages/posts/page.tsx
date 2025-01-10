import { postsQuery, Posts } from "@/components/pages/posts/posts";
import { LOCAL_API_URL } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PiPlus } from "react-icons/pi";
import { ActionFunctionArgs, Form, redirect } from "react-router";

export const postsLoader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData(postsQuery());
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return redirect("/login");
    }

    throw error;
  }
};

export const createPost =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const body = formData.get("body");

    if (!title || !body) return;

    const res = await axios.post(`${LOCAL_API_URL}/posts`, {
      title,
      body,
      userId: "677f927b879ea75c130006eb",
    });

    if (res.status >= 200 && res.status < 300) {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    }

    return null;
  };

export default function PostsPage() {
  return (
    <main>
      <div className="text-center max-w-screen-lg mx-auto space-y-8 p-8">
        <h1 className="text-4xl">Posts</h1>
        <Form method="post" className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <label className="flex w-full flex-col gap-2">
              Title
              <input
                type="text"
                name="title"
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
              />
            </label>
          </div>
          <button
            className="inline-flex justify-center gap-2 items-center p-3 rounded border-black border-2 w-52 hover:bg-black/10"
            type="submit"
          >
            Add
            <PiPlus size={24} />
          </button>
        </Form>
      </div>
      <Posts />
    </main>
  );
}
