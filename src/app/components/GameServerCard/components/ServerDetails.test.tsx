import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ServerDetails from './ServerDetails';

describe('ServerDetails Component', () => {
  const serverDetailsProps = {
    players: '100/200',
    version: '1.18.1',
    type: 'Survival',
    region: 'US-East',
    serverId: '1',
  };

  test('renders players, version, and type correctly', () => {
    render(<ServerDetails {...serverDetailsProps} />);

    const playersText = screen.getByText('Players:');
    const playersValue = screen.getByText(`${serverDetailsProps.players}`);
    const versionText = screen.getByText('Version:');
    const versionValue = screen.getByText(`${serverDetailsProps.version}`);
    const typeText = screen.getByText('Type:');
    const typeValue = screen.getByText(`${serverDetailsProps.type}`);

    expect(playersText).toBeInTheDocument();
    expect(playersValue).toBeInTheDocument();
    expect(versionText).toBeInTheDocument();
    expect(versionValue).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
    expect(typeValue).toBeInTheDocument();
  });

  test('shows the correct region shortcut when available', () => {
    render(<ServerDetails {...serverDetailsProps} />);

    const regionElement = screen.getByText('US-East');
    expect(regionElement).toBeInTheDocument();
  });

  test('displays the tooltip content correctly when hovering over the region', async () => {
    render(<ServerDetails {...serverDetailsProps} />);

    const regionElement = screen.getByText('US-East');

    // Simulate hover event
    act(() => {
      fireEvent.mouseEnter(regionElement);
    });

    // Wait for the tooltip to appear
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip', { name: serverDetailsProps.region });
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(serverDetailsProps.region);
    });
  });
});
