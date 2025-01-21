import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import ServerMods from "./ServerMods";

describe("ServerMods Component", () => {
  const setup = (mods: string[] = []) => {
    render(<ServerMods mods={mods} />);
  };

  it("renders the component with the correct title", () => {
    setup(["Mod1"]);

    act(() => {
      const title = screen.getByText(/mods/i);
      expect(title).toBeInTheDocument();
    });
  });

  it("renders a list of mods", () => {
    const mods = ["Mod1", "Mod2", "Mod3"];
    setup(mods);

    act(() => {
      mods.forEach((mod) => {
        const modElement = screen.getByText(mod);
        expect(modElement).toBeInTheDocument();
      });
    });
  });

  it("renders nothing when the mods list is empty", () => {
    setup([]);

    act(() => {
      const modElements = screen.queryAllByRole("span");
      expect(modElements.length).toBe(0);
    });
  });

  it("renders the correct classes for mod elements", () => {
    const mods = ["Mod1"];
    setup(mods);

    act(() => {
      const modElement = screen.getByText("Mod1");
      expect(modElement).toHaveClass(
        "px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
      );
    });
  });
});
