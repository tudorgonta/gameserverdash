import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameServerCard from './index';
import { GameServer } from '../../interfaces/interfaces';
import { act } from 'react';

const mockServer: GameServer = {
  id: "1",
  name: 'Test Server',
  game: 'Minecraft',
  status: 'online',
  players: '10/100',
  version: '1.20',
  type: 'Survival',
  region: 'Europe',
  mods: ['Mod1', 'Mod2'],
};

jest.useFakeTimers();

describe('GameServerCard', () => {
  it('renders all components correctly', () => {
    render(<GameServerCard server={mockServer} />);

    expect(screen.getByText('Test Server')).toBeInTheDocument();
    expect(screen.getByText('Minecraft')).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Online for'))).toBeInTheDocument(); // Dynamic text matcher
    expect(screen.getByText('Players:')).toBeInTheDocument();
    expect(screen.getByText('10/100')).toBeInTheDocument();
    expect(screen.getByText('Version:')).toBeInTheDocument();
    expect(screen.getByText('1.20')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('Survival')).toBeInTheDocument();
    expect(screen.getByText('Mod1')).toBeInTheDocument();
    expect(screen.getByText('Mod2')).toBeInTheDocument();
  });

  it('toggles server status on button click', async () => {
    render(<GameServerCard server={mockServer} />);

    act(() => {
      fireEvent.click(screen.getByLabelText('Server Settings')); // Open settings menu
    });

    // Wait for the "Turn Off" button to be available
    const turnOffButton = await screen.findByText('Turn Off');

    act(() => {
      fireEvent.click(turnOffButton); // Trigger server toggle
    });

    expect(turnOffButton).toBeDisabled(); // Button is disabled during processing

    act(() => {
      jest.advanceTimersByTime(2500); // Fast-forward snackbar display time
    });

    // Verify snackbar appears
    await waitFor(() => {
      expect(screen.getByText('Server successfully turned off!')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000); // Fast-forward snackbar timeout
    });

    // Verify snackbar is removed
    await waitFor(() => {
      expect(screen.queryByText('Server successfully turned off!')).not.toBeInTheDocument();
    });
  });

  it('handles open and close of server settings', async () => {
    render(<GameServerCard server={mockServer} />);

    const settingsButton = screen.getByLabelText('Server Settings');
    act(() => {
      fireEvent.click(settingsButton);
    });

    // Wait for the "Turn Off" button to appear
    await screen.findByText('Turn Off');
    expect(screen.getByText('Turn Off')).toBeInTheDocument();

    act(() => {
      fireEvent.click(settingsButton);
    });

    // Check that the "Turn Off" button is no longer visible
    expect(screen.queryByText('Turn Off')).not.toBeInTheDocument();
  });
});
