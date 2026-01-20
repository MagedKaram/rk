import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  if (!price) return "N/A";
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area) {
  if (!area) return "N/A";
  return `${area.toLocaleString("ar-EG")} م²`;
}
