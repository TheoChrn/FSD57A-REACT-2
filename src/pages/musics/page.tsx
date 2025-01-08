import { musicQuery, Musics } from "@/components/pages/musics/musics";
import { LOCAL_API_URL } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PiPlus } from "react-icons/pi";
import { ActionFunctionArgs, Form } from "react-router";

export const musicLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(musicQuery());
};

export const createMusic =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const name = formData.get("name");
    const author = formData.get("author");
    const genre = formData.get("genre");

    if (!name || !author || !genre) return;

    const res = await axios.post(`${LOCAL_API_URL}/musics`, {
      name,
      author,
      genre,
    });

    if (res.status >= 200 && res.status < 300) {
      await queryClient.invalidateQueries({ queryKey: ["musics"] });
    }

    return null;
  };

export default function MusicPage() {
  return (
    <main>
      <div className="text-center max-w-screen-lg mx-auto space-y-8 p-8">
        <h1 className="text-4xl">Musics</h1>
        <Form method="post" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex flex-1  flex-col gap-2">
              Name
              <input
                type="text"
                name="name"
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex flex-1 flex-col gap-2">
              Author
              <input
                type="text"
                name="author"
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex flex-1  flex-col gap-2">
              Genre
              <input
                type="text"
                name="genre"
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
        <Musics />
      </div>
    </main>
  );
}
