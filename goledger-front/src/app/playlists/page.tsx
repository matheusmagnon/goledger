'use client';

import React, { useState, useEffect } from 'react';
import PlaylistItem from './PlaylistItem';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { useStreaminContext } from '@/context/StreamingContext';
import ListContainer from '../components/ListContainer';
import { FloppyDisk } from 'phosphor-react';
// import SearchInput from '../components/inputs/SearchInput';

// const Loading = () => <div className='text-white'>Carregando...</div>;
// const ErrorMessage = ({ message }: { message: string }) => <div>{message}</div>;

export default function Artists() {
  const { songs, fetchSongs, playlists, fetchPlaylists } = useStreaminContext();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [artistsSelected, setArtistsSelected] = useState({});
  // const [artistsToSelection, setArtistsToSelection] = useState();
  const [country, setCountry] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>(''); // Estado para armazenar a opção selecionada

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value); // Atualiza o estado com a opção selecionada
  };

  // const artistsToSelection = artists.map((artist)=>{
  //   return {
  //     name: artist.name,
  //     '@key': artist['@key']
  //   }
  // })

  useEffect(() => {
    fetchPlaylists();
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez, após a renderização inicial'


  useEffect(() => {
    fetchSongs();
    // console.log('artists eff', artists)
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez, após a renderização inicial'

  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage message={error} />;

  // Function to handle artist creation

  // console.log('artistsToSelection', artistsToSelection);

  const handleCreateAlbum = () => {
    if (name && country) {
      addAlbum(name, country, artistsSelected); // Adiciona o novo artista
      setName(''); // Limpa o campo de nome
      setCountry(''); // Limpa o campo de país
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-w-full flex flex-col">
      <div className="flex justify-between items-center mt-12">
        <h1 className="text-3xl text-paragraph font-bold">Suas playlists</h1>
        <Dialog.Root>
          <Dialog.Trigger
            className="bg-slate-50 hover:bg-slate-600 hover:text-paragraph cursor-pointer 
                      transition-colors p-3 rounded-full h-12 flex items-center font-semibold"
          >
            Cadastrar Playlist
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
          <Dialog.Content className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-6
                                   bg-white rounded-lg shadow-xl z-50">
            <Dialog.Title className="text-2xl font-bold">Insira os dados da playlist</Dialog.Title>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Nome da playlist"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Deseja que a playlist seja privada?</label>

              <div className='flex gap-10'>
                <label>
                  <input
                    className='mr-1'
                    type="radio"
                    name="opcao"
                    value="sim"
                    checked={selectedOption === 'sim'}
                    onChange={handleChange}
                  />
                  Sim
                </label>

                <label>
                  <input
                    className='mr-1'
                    type="radio"
                    name="opcao"
                    value="nao"
                    checked={selectedOption === 'nao'}
                    onChange={handleChange}
                  />
                  Não
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome do artista:</label>
              {/* <SearchInput
                items={artistsToSelection}
                placeholder="Digite o nome do artista..."
                onSelect={(selected) => setArtistsSelected(selected)}
              /> */}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreateAlbum}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
                          rounded-full h-12 flex items-center font-medium"
              ><FloppyDisk size={20} className="text-paragraph" />
                <span className="text-paragraph">Salvar</span>
              </button>
            </div>
            <Dialog.Close className="absolute top-2 right-2 text-xl cursor-pointer">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <ListContainer>
        {playlists?.map((playlist) => (
          <PlaylistItem key={playlist['@key']} name={playlist.name} isPrivate={playlist.private} id={playlist['@key']} />
        ))
        }
      </ListContainer>
    </div>
  );
}