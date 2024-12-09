import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Albums from './page';
import { StreamingProvider } from '@/context/StreamingContext';

vi.mock('@/context/StreamingContext', () => ({
  useStreamingContext: () => ({
    albums: [
      { '@key': '1', name: 'Album 1', year: 2021 },
      { '@key': '2', name: 'Album 2', year: 2022 },
    ],
    artists: [
      { '@key': '1', name: 'Artista 1', country: 'Brasil' },
      { '@key': '2', name: 'Artista 2', country: 'EUA' }
    ],
    addAlbum: vi.fn(() => Promise.resolve()),
    fetchAlbum: vi.fn(),
    fetchArtists: vi.fn(),
  }),
  StreamingProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithContext = (ui: React.ReactElement) =>
  render(ui, { wrapper: (props: { children: React.ReactNode }) => <StreamingProvider {...props} /> });

describe('Albums Page', () => {
  test('should render albums page correctly', async () => {
    renderWithContext(<Albums />);

    expect(screen.getByText(/Álbuns/i)).toBeDefined();
    expect(screen.getByText(/Cadastrar Álbum/i)).toBeDefined();
  });

  test('should show modal to register new artist', async () => {
    renderWithContext(<Albums />);

    const button = screen.getByRole('button', { name: /Cadastrar Álbum/i });

    fireEvent.click(button);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const inputNameAlbum = screen.getByPlaceholderText('Nome do álbum');
    await userEvent.type(inputNameAlbum, 'Album 4');
    expect(inputNameAlbum).toHaveValue('Album 4');

    const inputYear = screen.getByPlaceholderText('Ano do álbum');
    await userEvent.type(inputYear, '2021');
    expect(inputYear).toHaveValue(2021);


    const inputartistName = screen.getByPlaceholderText('Digite o nome do artista...');
    await userEvent.type(inputartistName, 'A');

    fireEvent.click(screen.getByText(/Artista 2/i));

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
    expect(inputNameAlbum).toHaveValue('');
    expect(inputYear).toHaveValue(null);
    expect(inputartistName).toHaveValue('');
    });
  });
});
