import { WEATHER_API_KEY, WEATHER_API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function WeatherPage() {
  const [city, setCity] = useState("");

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["weather", city],
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, city] = queryKey;
      if (!city) {
        throw new Error("City is required");
      }
      const response = await axios.get(
        `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      return response.data;
    },
    enabled: !!city,
  });

  if (error) return <span>{error.message}</span>;

  const results = data;


  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (city.length > 2) refetch();
        }}
        className="flex flex-col items-center justify-center text-center"
      >
        <label>
          Search a city
          <input
            onChange={(e) => setCity(e.target.value)}
            name="city"
            type="text"
            className="block border-2 border-black min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </label>
      </form>
      {isLoading && <p className="text-center">Loading...</p>}
      {data && (
        <div className="flex flex-col items-center justify-center">
          <h2>{results.name}</h2>
          <ul>
            <li>Temperature: {results.main.temp} °C</li>
            <li>Feels like: {results.main.feels_like} °C</li>
            <li>Min: {results.main.temp_min} °C</li>
            <li>Max: {results.main.temp_max} °C</li>
          </ul>
        </div>
      )}
    </>
  );
}
