import { Avatar } from "@/components/avatar";
import { Loading } from "@/components/loading";
import { API_URL, WEATHER_API_KEY, WEATHER_API_URL } from "@/lib/utils";
import {
  QueryClient,
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { LoaderFunctionArgs, useLoaderData, useNavigation } from "react-router";

const userDetailQuery = (id: string) =>
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

  const user: MockUser = data.data;

  const { lat, lng } = user.address.geo;

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ["user", userId, "city"],
    queryFn: async () => {
      const weather = await axios.get(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!weather) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return weather;
    },
    enabled: Boolean(user),
  });

  if (state === "loading") return <Loading />;

  if (isWeatherLoading) return <Loading />;

  if (weatherError) return <p>{weatherError.message}</p>;

  const weather: Weather = weatherData?.data;

  return (
    <main className="min-h-max flex flex-col items-center justify-center">
      <Avatar image="https://i.pravatar.cc/150?u=fake@pravatar.com" {...user} />
      {weather && (
        <div className="flex flex-col items-center justify-center">
          <h2>{weather.name}</h2>
          <ul>
            <li>Temperature: {weather.main.temp} °C</li>
            <li>Feels like: {weather.main.feels_like} °C</li>
            <li>Min: {weather.main.temp_min} °C</li>
            <li>Max: {weather.main.temp_max} °C</li>
          </ul>
        </div>
      )}
    </main>
  );
}
