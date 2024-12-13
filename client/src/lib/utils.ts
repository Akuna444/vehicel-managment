import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backendUrlBase = 'https://vehicel-managment.onrender.com';
export const backendUrl = 'https://vehicel-managment.onrender.com/api/v1';

// date.ts
export function getCurrentDate() {
  const now = new Date();

  // Get day, month, and year
  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  // Determine the suffix for the day
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  return `${day}${suffix} ${month} ${year}`;
}
