// GameServerCard.tsx
import React, { useState } from "react";
import { GameServer } from "../../interfaces/interfaces";
import ServerHeader from "./components/ServerHeader";
import ServerSettings from "./components/ServerSettings";
import ServerDetails from "./components/ServerDetails";
import ServerMods from "./components/ServerMods";
import Snackbar from "../Snackbar";

interface GameServerCardProps {
  server: GameServer;
}

const GameServerCard: React.FC<GameServerCardProps> = ({ server }) => {
  const [isOnline, setIsOnline] = useState(server.status === "online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [open, setOpen] = useState(false);

  const [onlineDuration] = useState(() => {
    const randomTime =
      Math.random() < 0.5
        ? `${Math.floor(Math.random() * 60)}m`
        : `${Math.floor(Math.random() * 12)}h`;
    return randomTime;
  });

  const handleServerToggle = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsOnline((prev) => !prev);
      setShowSnackbar(true);
      setOpen(false);

      setTimeout(() => setShowSnackbar(false), 2000);
    }, 2500);
  };

  return (
    <div
      className={`relative p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ${
        isProcessing ? "blur-sm animate-pulse" : ""
      }`}
    >
      <ServerHeader name={server.name} game={server.game} status={isOnline ? "online" : "offline"} duration={onlineDuration} />

      <ServerSettings
        isOpen={open}
        onToggle={() => setOpen(!open)}
        onServerToggle={handleServerToggle}
        isProcessing={isProcessing}
        isOnline={isOnline}
      />

      <ServerDetails
        players={server.players}
        version={server.version}
        type={server.type}
        region={server.region}
        serverId={server.id}
      />

      <ServerMods mods={server.mods} />

      <Snackbar isVisible={showSnackbar} message={`Server successfully turned ${isOnline ? "on" : "off"}!`} />
    </div>
  );
};

export default GameServerCard;
