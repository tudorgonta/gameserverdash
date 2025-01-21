// ServerDetails.tsx
import React from "react";
import { Tooltip } from "react-tooltip";
import { regionShortcuts } from "../constants";

interface ServerDetailsProps {
  players: string;
  version: string;
  type: string;
  region: string;
  serverId: string;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({
  players,
  version,
  type,
  region,
  serverId,
}) => (
  <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
    <p>
      <strong>Players:</strong> {players}
    </p>
    <p>
      <strong>Version:</strong> {version}
    </p>
    <p>
      <strong>Type:</strong> {type}
    </p>
    <div>
      <strong>Region:</strong>{" "}
      <span
        className="font-medium underline cursor-pointer"
        data-tooltip-id={`tooltip-${serverId}`}
        data-tooltip-content={region}
      >
        {regionShortcuts[region] || region}
      </span>
      <Tooltip id={`tooltip-${serverId}`} place="top" />
    </div>
  </div>
);

export default ServerDetails;
