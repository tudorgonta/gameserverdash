// interfaces.ts
export interface GameServer {
    id: string;
    name: string;
    game: string;
    players: string;
    status: "online" | "offline";
    version: string;
    type: string;
    region: string;
    mods: string[];
  }
  