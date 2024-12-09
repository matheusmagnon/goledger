import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ArtistItem from '../ArtistItem';
import { StreamingProvider } from '@/context/StreamingContext';
import ArtistAlbum from '../ArtistsAlbum';

vi.mock('@/context/StreamingContext', () => ({
  useStreamingContext: () => ({
    artists: [
      { '@key': '1', name: 'Artista 1', country: 'Brasil' },
      { '@key': '2', name: 'Artista 2', country: 'EUA' }
    ],
    editArtist: vi.fn(),
    removeArtist: vi.fn()
  }),
  StreamingProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithContext = (ui: React.ReactElement) =>
  render(ui, { wrapper: (props: { children: React.ReactNode }) => <StreamingProvider {...props} /> });

describe('Tests to edit and delete artist', () => {
  test('should render list of artist page correctly', async () => {
    renderWithContext(<ArtistItem country="Brasil" id="422" name="Artista 2" key="43r" />);

    expect(screen.getByText(/Artista 2/i)).toBeDefined();
    expect(screen.getByText(/Brasil/i)).toBeDefined();
  });

  test('edit artist', async () => {
    renderWithContext(<ArtistAlbum artistCountry='Brazil' artistId='432' artistName='Artist NAme 1' key="1" albums={[
      {
        "@key": "1",
        name: "Album 1",
        year: '2021'
      }
    ]} />);

    const editButton = screen.getByRole('button', { name: /Editar Artista/i });
    fireEvent.click(editButton);

    const inputCountry = screen.getByDisplayValue('');
    fireEvent.change(inputCountry, { target: { value: 'Argentina' } });

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(inputCountry).toHaveValue('');
    });

  });

  test('should delete artist', async () => {
    renderWithContext(<ArtistItem country="Brazil" id="432" name="Artist Name" key="1" />);

    const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const saveButtonAfterSave = screen.queryByRole('button', { name: /Brazil/i });
      expect(saveButtonAfterSave).toBeNull(); 
    });
  });
});
