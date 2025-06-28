import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const observationCodes = {
  "1": "Intervalo entre instalação e coleta maior que o previsto",
  "2": "Ovitrampa ou paleta desaparecida", 
  "3": "Ovitrampa ou paleta quebrada",
  "4": "Ovitrampa ou paleta removida",
  "5": "Ovitrampa seca",
  "6": "Casa fechada",
  "7": "Ovitrampa cheia de água",
  "8": "Ovitrampa com pouca água"
};

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatCoordinate(coord: string | null, precision = 6) {
  if (!coord) return "-";
  return parseFloat(coord).toFixed(precision);
}

export function validateCoordinates(lat: string, lng: string) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  return (
    !isNaN(latitude) && 
    !isNaN(longitude) &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
}

export function calculatePositivityRate(totalTraps: number, positiveTraps: number) {
  if (totalTraps === 0) return 0;
  return (positiveTraps / totalTraps) * 100;
}
