import { render, screen } from '@testing-library/react';
import ServerHeader from './ServerHeader';

describe('ServerHeader Component', () => {
  const serverHeaderProps = {
    name: 'Minecraft Server',
    game: 'Minecraft',
    status: 'online' as 'online' | 'offline',
    duration: '3 days',
  };

  test('renders server name, game, and status correctly', () => {
    render(<ServerHeader {...serverHeaderProps} />);

    const nameElement = screen.getByText(serverHeaderProps.name);
    const gameElement = screen.getByText(serverHeaderProps.game);
    const statusElement = screen.getByText(`Online for ${serverHeaderProps.duration}`);

    expect(nameElement).toBeInTheDocument();
    expect(gameElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });

  test('shows the correct status indicator when online', () => {
    render(<ServerHeader {...serverHeaderProps} />);

    const statusElement = screen.getByText(`Online for ${serverHeaderProps.duration}`);
    
    // Select the status dot (span) based on the class of the element (bg-green-500 for online)
    const statusIndicator = screen.getByText(`Online for ${serverHeaderProps.duration}`).closest('p')?.querySelector('span') as HTMLElement;

    expect(statusElement).toBeInTheDocument();
    expect(statusIndicator).toHaveClass('bg-green-500');
  });

  test('shows the correct status message when offline', () => {
    render(<ServerHeader {...{ ...serverHeaderProps, status: 'offline' as 'online' | 'offline' }} />);

    const statusElement = screen.getByText('Offline');
    
    // Similarly, select the status dot (span) for the offline case
    const statusIndicator = screen.getByText('Offline').closest('p')?.querySelector('span') as HTMLElement;

    expect(statusElement).toBeInTheDocument();
    expect(statusIndicator).toHaveClass('bg-red-500');
  });
});
