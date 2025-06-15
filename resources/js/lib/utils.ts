import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitialNameUser(name: string) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2) // ambil maksimal 2 kata
      .map(word => word[0].toUpperCase())
      .join('');
  }

