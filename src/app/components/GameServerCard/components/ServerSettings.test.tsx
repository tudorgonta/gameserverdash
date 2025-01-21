import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ServerSettings from "./ServerSettings";

describe("ServerSettings Component", () => {
  const mockOnToggle = jest.fn();
  const mockOnServerToggle = jest.fn();

  const setup = ({
    isOpen = false,
    isProcessing = false,
    isOnline = false,
  } = {}) => {
    render(
      <ServerSettings
        isOpen={isOpen}
        onToggle={mockOnToggle}
        onServerToggle={mockOnServerToggle}
        isProcessing={isProcessing}
        isOnline={isOnline}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls onToggle when the settings button is clicked", () => {
    setup();
    const settingsButton = screen.getByRole("button", { name: /server settings/i });

    act(() => {
      fireEvent.click(settingsButton);
    });

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it("renders the settings dropdown when isOpen is true", () => {
    setup({ isOpen: true });

    act(() => {
      const dropdown = screen.getByText(/turn on/i); // Assuming "Turn On" text appears when dropdown is open
      expect(dropdown).toBeInTheDocument();
    });
  });

  it("does not render the settings dropdown when isOpen is false", () => {
    setup({ isOpen: false });

    act(() => {
      const dropdown = screen.queryByText(/turn on/i);
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  it("calls onServerToggle when the 'Turn On/Turn Off' button is clicked", () => {
    setup({ isOpen: true, isOnline: false });

    act(() => {
      const toggleButton = screen.getByRole("button", { name: /turn on/i });
      fireEvent.click(toggleButton);
    });

    expect(mockOnServerToggle).toHaveBeenCalledTimes(1);
  });

  it("disables the 'Turn On/Turn Off' button when isProcessing is true", () => {
    setup({ isOpen: true, isProcessing: true });

    act(() => {
      const toggleButton = screen.getByRole("button", { name: /turn on/i });
      expect(toggleButton).toBeDisabled();
    });
  });

  it("renders 'Turn Off' when isOnline is true", () => {
    setup({ isOpen: true, isOnline: true });

    act(() => {
      const toggleButton = screen.getByRole("button", { name: /turn off/i });
      expect(toggleButton).toBeInTheDocument();
    });
  });

  it("renders 'Turn On' when isOnline is false", () => {
    setup({ isOpen: true, isOnline: false });

    act(() => {
      const toggleButton = screen.getByRole("button", { name: /turn on/i });
      expect(toggleButton).toBeInTheDocument();
    });
  });
});
