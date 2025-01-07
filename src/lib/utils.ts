import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = import.meta.env.VITE_URL;
export const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
