'use client';

import React, { useState, useEffect } from 'react';
import SongItem from './SongItem';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { useStreamingContext } from '@/context/StreamingContext';
import ListContainer from '../components/ListContainer';
import { FloppyDisk } from 'phosphor-react';
import SearchInput from '../components/inputs/SearchInput';

// const Loading = () => <div className='text-white'>Carregando...</div>;
// const ErrorMessage = ({ message }: { message: string }) => <div>{message}</div>;

type albumSelectedType = {
  name: string;
  '@key'?: string;
};

export default function Artists() {
  const { songs, fetchSongs, addSong, albums, fetchAlbum } = useStreamingContext();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [albumSelected, setAlbumSelected] = useState<albumSelectedType | undefined>(undefined);
  // const [artistsToSelection, setArtistsToSelection] = useState();
  // const [country, setCountry] = useState<string>('');


  const AlbumsToSelection = albums.map((album) => {
    return {
      name: album.name,
      '@key': album['@key']
    }
  })

  useEffect(() => {
    fetchSongs();
  }, []); 


  useEffect(() => {
    fetchAlbum();
    // console.log('artists eff', artists)
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez, após a renderização inicial'

  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage message={error} />;

  // Function to handle artist creation

  // console.log('artistsToSelection', AlbumsToSelection);

  // const musicList = songs.map(song => {
  //   // Encontrando o álbum correspondente usando find
  //   const album = albums.find(album => album["@key"] === song.album["@key"]);
  //   const albumName = album ? album.name : "Álbum Desconhecido"; // Caso não encontre, retorna "Álbum Desconhecido"

  //   return {
  //     id: song["@key"], // Chave da música
  //     name: song.name,    // Nome da música
  //     album: albumName    // Nome do álbum
  //   };
  // });

  // console.log(JSON.stringify(musicList, null, 2));

  // console.log('album Names',albumNames );

  const handleCreateSong = () => {
    // console.log('albumSelected', albumSelected)
    if (name && albumSelected) {
      const albumId = albumSelected['@key']
      addSong(name, String(albumId));
      setName('');
      setAlbumSelected(undefined);
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-w-full flex flex-col">
      <div className="flex justify-between items-center mt-12">
        <h1 className="text-3xl text-paragraph font-bold">Músicas</h1>
        <Dialog.Root>
          <Dialog.Trigger
            className="bg-slate-50 hover:bg-slate-600 hover:text-paragraph cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-semibold"
          >
            Cadastrar Música
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
          <Dialog.Content className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-6 bg-white rounded-lg shadow-xl z-50">
            <Dialog.Title className="text-2xl font-bold">Insira os dados da música</Dialog.Title>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Nome da Música"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome do Álbum:</label>
              <SearchInput
                items={AlbumsToSelection}
                placeholder="Digite o nome do Álbum..."
                onSelect={(selected) => setAlbumSelected(selected)}
                resetQuery={albumSelected === undefined} // Limpa o campo se albumSelected for undefined
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreateSong}
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
        {songs?.map((song, index) => (
          <SongItem key={song['@key'] || index} name={song.name} id={song['@key']} AlbumName={song.album?.name} />
        ))
        }
      </ListContainer>
    </div>
  );
}