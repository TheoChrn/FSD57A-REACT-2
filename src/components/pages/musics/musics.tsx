import { Loading } from "@/components/loading";
import { LOCAL_API_URL } from "@/lib/utils";

import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { PiTrash } from "react-icons/pi";

export const musicQuery = () =>
  queryOptions({
    queryKey: ["musics"],
    queryFn: async () => {
      const musics = await axios.get(`${LOCAL_API_URL}/musics`);
      if (!musics) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return musics;
    },
  });

export function Musics() {
  const { data, isLoading, error } = useSuspenseQuery(musicQuery());

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`${LOCAL_API_URL}/musics/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["musics"] }),
  });

  if (isLoading) return <Loading />;
  console.log(error);
  if (error) return error.message;

  const musics: Music[] = data.data;
  return (
    <div>
      {musics.length ? (
        <>
          <ul className="flex flex-wrap">
            {musics.map((music) => (
              <li
                className="flex flex-1 flex-col gap-1 capitalize"
                key={music.id}
              >
                <span>{music.name}</span>
                <span>{music.author}</span>
                <span>{music.genre}</span>
                <button
                  className="flex gap-2 items-center border-2 border-red-600 hover:bg-red-600 hover:text-white text-red-600 rounded px-3 py-2 w-fit mx-auto"
                  onClick={() => mutate(music.id)}
                >
                  <PiTrash size={24} /> DELETE
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span>No musics were found</span>
      )}
    </div>
  );
}
