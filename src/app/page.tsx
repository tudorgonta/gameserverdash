"use client";
import { useEffect, useState } from "react";
import GameServerCard from "./components/GameServerCard";
import DarkModeToggle from "./components/DarkModeToggle";
import { GameServer } from "./interfaces/interfaces";

/*
  Welcome to the simplegamehosting coding assignment!

  if you got this far great job! 🎉
  Now it's your turn to shine! 🌟
  
  The mock data is fetched from the server and displayed on the page.

  Your task is to create a dynamic card component for each server in the list.
  - The card should display the server's name, game, players, status, version etc, bonus points for displaying any extra data from the json response.
  - please use tailwind to style your components, you can use the existing styles in this file as a reference.
  - You can also use any other libraries you like to help you build the UI.
  
  for extra info please read the README.md file in the root of the project.
*/

export default function Home() {
  const [serverData, setServerData] = useState<GameServer[]>([{ id: 0, name: "", game: "", players: "", status: "offline", version: "", type: "", region: "", mods: [] }]);
  // you can update this fetching code if required but it's not necessary for the assignment.
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await fetch("/api/mock");
        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error("Failed to fetch server data:", error);
      }
    };

    fetchServerData();
  }, []);

  if (!serverData || serverData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          No servers available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Game Server Dashboard
          </h1>
          <DarkModeToggle />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {serverData.map((server) => (
            <GameServerCard
              key={server.id}
              server={server}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
