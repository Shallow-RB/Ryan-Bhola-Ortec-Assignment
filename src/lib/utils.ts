import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFibonacci(n: number) {
  return (
    (n >= 0 && Math.round(Math.sqrt(5 * n * n + 4)) ** 2 === 5 * n * n + 4) ||
    Math.round(Math.sqrt(5 * n * n - 4)) ** 2 === 5 * n * n - 4
  );
}
