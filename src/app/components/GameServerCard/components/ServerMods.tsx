// ServerMods.tsx
import React from "react";

interface ServerModsProps {
  mods: string[];
}

const ServerMods: React.FC<ServerModsProps> = ({ mods }) => (
  <div className="mt-4">
    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mods:</h4>
    <div className="flex flex-wrap gap-2">
      {mods.map((mod) => (
        <span
          key={mod}
          className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
        >
          {mod}
        </span>
      ))}
    </div>
  </div>
);

export default ServerMods;
