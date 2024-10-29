// hooks/useColor.ts
export const getColorByUser = (name: string): string => {
    const colorMap: Record<string, string> = {
      adam: "#ef4444", // red-500
      yassine: "#3b82f6", // blue-500
      amine: "#10b981", // green-500
      hannan: "#fbbf24", // yellow-500
      fija: "#a855f7", // purple-500
      david: "#ec4899", // pink-500
      default: "#d1d5db", // gray-300
    };
    return colorMap[name.toLowerCase()] || colorMap.default; // Return default color if not found
  };
  