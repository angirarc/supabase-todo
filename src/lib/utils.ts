import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleError = (err: unknown) => {
  let errorMessage = "An error occurred";
  
  if (err instanceof Error) errorMessage = err.message;

  return { errorMessage, data: null };
}