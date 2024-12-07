import { fireEvent, render, screen } from '@testing-library/react';
import { StreamingProvider } from '../../context/StreamingContext';
import { vi } from 'vitest';
import ArtistItem from './ArtistItem';

// Mock of context Streaming
vi.mock('@/context/StreamingContext', () => ({
  useStreamingContext: () => ({
    artists: [
      { '@key': '1', name: 'Artista 1', country: 'Brasil' },
      { '@key': '2', name: 'Artista 2', country: 'EUA' }
    ],
    addArtist: vi.fn(() => Promise.resolve()),
    fetchArtists: vi.fn(),
  }),
}));

// Function to render the component with context
const renderWithContext = (ui: React.ReactElement) =>
  render(ui, { wrapper: StreamingProvider });

describe('Artists Page', () => {
  test('should render list of artis page correctly', async () => {
    // Render component
    renderWithContext(<ArtistItem country='Brasil' id='422' name='Artista 2' key='43r' />);

    expect(screen.getByText(/Artista 2/i)).toBeDefined();

    expect(screen.getByText(/Brasil/i)).toBeDefined();
  });



  test('list and do actions on artist', async () => {
    renderWithContext(<ArtistItem country='EUA' id='432' name='Artista 1' key='42r' />);

    const Editbutton = screen.getByRole('button', { name: /Editar/i });

    fireEvent.click(Editbutton);

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Novo País' } } );
  
    // Verifique se o valor do input foi atualizado
    expect(inputElement.value).toBe('Novo País') ;

    const buttonSave = screen.getByRole('button', { name: /Salvar/i });
    
    fireEvent.click(buttonSave);

    fireEvent.click(Editbutton);

    const CancelButton = screen.getByRole('button', { name: /Cancelar/i });

    fireEvent.click(CancelButton);

    const DeleteButton = screen.getByRole('button', { name: /Excluir/i });

    fireEvent.click(DeleteButton);
  })
});
