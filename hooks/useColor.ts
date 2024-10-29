// useColor.ts
export const getColorClassByUser = (name: string) => {
  // Explicitly list all possible classes to prevent purging
  if (name.toLowerCase() === "adam") return "bg-red-500 text-white";
  if (name.toLowerCase() === "yassine") return "bg-blue-500 text-white";
  if (name.toLowerCase() === "hannan") return "bg-green-500 text-white";
  if (name.toLowerCase() === "amine") return "bg-yellow-500";
  if (name.toLowerCase() === "fija") return "bg-purple-500 text-white";
  if (name.toLowerCase() === "david") return "bg-pink-500 text-white";
  return "bg-gray-300 text-gray-500"; // Default color
};
