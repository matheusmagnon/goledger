import { fireEvent, render, screen } from '@testing-library/react';
import { StreamingProvider } from '../../context/StreamingContext';
import Artists from './page'; // ou o caminho correto para o seu componente Artists
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

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
  test('should render artists page correctly', async () => {
    // Renderiza o componente
    renderWithContext(<Artists />);

    // Verifica se o título está presente
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
  })
});
