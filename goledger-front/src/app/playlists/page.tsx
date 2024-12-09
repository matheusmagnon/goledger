'use client';

import React, { useState, useEffect } from 'react';
import PlaylistItem from './PlaylistItem';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { useStreamingContext } from '@/context/StreamingContext';
import ListContainer from '../components/ListContainer';
import { CircleNotch, FloppyDisk, PlusCircle } from 'phosphor-react';
import MultiSelect from '../components/inputs/MultiSelect';
import { ItemToSelect } from '@/types/global';
import PlaylistSongs from './PlaylistSongs';  

export default function Playlist() {
  const { songs, playlists, fetchPlaylists, addPlaylist } = useStreamingContext();
  const [name, setName] = useState<string>('');
  const [selectedSongs, setSelectedSongs] = useState<ItemToSelect[] | undefined>([]);
  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    setIsPrivate(value === 'sim');
  };

  const songsToSelect: ItemToSelect[] = songs.map((song) => ({
    name: song.name,
    '@key': song['@key'],
  }));

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (playlists.length > 0 && !selectedPlaylist) {
      setSelectedPlaylist(playlists[0]['@key']);
    }
  }, [playlists, selectedPlaylist]);

  const handleCreatePlaylist = async () => {
    if (name && isPrivate !== undefined) {
      setIsLoading(true);
      try {
        await addPlaylist({ name, isPrivate, songs: selectedSongs });
        setName('');
        setIsPrivate(false);
        setSelectedSongs(undefined);
        setSelectedOption('');
      } catch (err) {
        toast.error('Erro ao criar a playlist.' + err);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  const handleSelectPlaylist = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };
  const selectedPlaylistData = playlists.find((playlist) => playlist['@key'] === selectedPlaylist);
  return (
    <>
    <div className='mt-14'>
      <div className='flex items-center'>
        <h1 className="text-3xl text-white font-bold mb-4">Suas Playlists </h1>
        <Dialog.Root>
          <Dialog.Trigger title="Clique para adicionar uma playlist" className=" hover:bg-emerald-600 text-white p-1 ml-2 mb-4 rounded-lg">
            <PlusCircle size={30} weight='bold' />
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-6 bg-white rounded-lg shadow-xl z-50"
          >
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
              <div className="flex gap-10 pt-1">
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="opcao"
                    value="sim"
                    checked={selectedOption === 'sim'}
                    onChange={handleChange}
                  />
                  <span className="font-semibold">Sim</span>
                </label>

                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="opcao"
                    value="nao"
                    checked={selectedOption === 'nao'}
                    onChange={handleChange}
                  />
                  <span className="font-semibold">Não</span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold pb-2">Nome da música:</label>
              <MultiSelect
                items={songsToSelect}
                onSelectionChange={(selected) => setSelectedSongs(selected)}
                resetSelection={selectedSongs === undefined}
                selected={selectedSongs} 
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreatePlaylist}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
              rounded-full h-12 flex items-center font-medium"
              >
                {isLoading ? <CircleNotch size={20} className="animate-spin" weight='bold' color='white' /> : <FloppyDisk size={20} weight='bold' color='white' />}
                <span className="text-paragraph">Salvar</span>
              </button>
            </div>
            <Dialog.Close className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2">
                ×
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div className="flex h-screen gap-4">
        <div className="w-1/3 bg-gray-900 overflow-y-auto rounded-xl">
          <ListContainer direction='col'>
            {playlists.map((playlist, index) => (
              <div
                key={playlist['@key'] || `playlist-${index}`}
                onClick={() => handleSelectPlaylist(playlist['@key'])}
                className={` mb-2 rounded-lg cursor-pointer text-white ${selectedPlaylist === playlist['@key'] ? 'bg-gray-700' : 'bg-gray-800'}`}
              >
                <PlaylistItem
                  name={playlist.name}
                  isPrivate={playlist.private}
                  id={playlist['@key']}
                  songsOfPlaylist={playlist.songs}
                  playlistImage={playlist.cover}
                />
              </div>
            ))}
          </ListContainer>
        </div>

        {selectedPlaylistData && (
          <PlaylistSongs
            playlistName={selectedPlaylistData.name}
            songsOfPlaylist={selectedPlaylistData.songs}
            playlistId={selectedPlaylistData['@key']}
            imagePlaylist={selectedPlaylistData.cover}
            isPrivate={selectedPlaylistData.private}
          />
        )}
      </div>
    </div>
    </>
  );
}
