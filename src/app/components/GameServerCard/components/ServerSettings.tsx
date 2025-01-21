// ServerSettings.tsx
import React from "react";
import { MdSettings } from "react-icons/md";

interface ServerSettingsProps {
  isOpen: boolean;
  onToggle: () => void;
  onServerToggle: () => void;
  isProcessing: boolean;
  isOnline: boolean;
}

const ServerSettings: React.FC<ServerSettingsProps> = ({
  isOpen,
  onToggle,
  onServerToggle,
  isProcessing,
  isOnline,
}) => (
  <div className="absolute top-4 right-4">
    <button
      className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Server Settings"
      onClick={onToggle}
    >
      <MdSettings size={20} />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10">
        <button
          onClick={onServerToggle}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition rounded-lg"
          disabled={isProcessing}
        >
          {isOnline ? "Turn Off" : "Turn On"}
        </button>
      </div>
    )}
  </div>
);

export default ServerSettings;
