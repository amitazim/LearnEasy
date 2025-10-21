import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getRandomDarkColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    // 0–127 instead of 0–255 to keep it dark
    const value = Math.floor(Math.random() * 178); 
    color += value.toString(16).padStart(2, "0");
  }
  return color;
}