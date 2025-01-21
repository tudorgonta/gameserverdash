// ServerHeader.tsx
import React from "react";

interface ServerHeaderProps {
  name: string;
  game: string;
  status: "online" | "offline";
  duration: string;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ name, game, status, duration }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{game}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"}`}></span>
      {status === "online" ? `Online for ${duration}` : "Offline"}
    </p>
  </div>
);

export default ServerHeader;
