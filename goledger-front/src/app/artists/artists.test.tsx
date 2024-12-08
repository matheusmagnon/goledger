import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Artists from './page';
import { StreamingProvider } from '@/context/StreamingContext';

vi.mock('@/context/StreamingContext', () => ({
  useStreamingContext: () => ({
    artists: [
      { '@key': '1', name: 'Artista 1', country: 'Brasil' },
      { '@key': '2', name: 'Artista 2', country: 'EUA' }
    ],
    addArtist: vi.fn(() => Promise.resolve()),
    fetchArtists: vi.fn(),
  }),
  StreamingProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithContext = (ui: React.ReactElement) =>
  render(ui, { wrapper: (props: { children: React.ReactNode }) => <StreamingProvider {...props} /> });

describe('Artists Page', () => {
  test('should render artists page correctly', async () => {
    renderWithContext(<Artists />);

    expect(screen.getByText(/Artistas/i)).toBeDefined();
    expect(screen.getByText(/Cadastrar artista/i)).toBeDefined();
  });

  test('should show modal to register new artist', async () => {
    renderWithContext(<Artists />);

    const button = screen.getByRole('button', { name: /Cadastrar artista/i });

    fireEvent.click(button);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const inputName = screen.getByPlaceholderText('Nome do artista');
    await userEvent.type(inputName, 'Novo Artista');
    expect(inputName).toHaveValue('Novo Artista');

    const inputCountry = screen.getByPlaceholderText('País do artista');
    await userEvent.type(inputCountry, 'Brasil');
    expect(inputCountry).toHaveValue('Brasil');

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(inputName).toHaveValue(''); 
    });
  });
});
