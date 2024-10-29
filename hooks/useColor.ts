export const getColorClassByUser = (name: string) => {
  switch (name.toLowerCase()) {
    case "adam":
      return "bg-red-500 text-white";
    case "yassine":
      return "bg-blue-500 text-white";
    case "hannan":
      return "bg-green-500 text-white";
    case "amine":
      return "bg-yellow-500 text-white";
    case "fija":
      return "bg-purple-500 text-white";
    case "david":
      return "bg-pink-500";
    default:
      return "bg-gray-300"; // Fallback color
  }
};
