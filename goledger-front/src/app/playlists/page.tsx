'use client';

import React, { useState, useEffect } from 'react';
import PlaylistItem from './PlaylistItem';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { useStreamingContext } from '@/context/StreamingContext';
import ListContainer from '../components/ListContainer';
import { FloppyDisk } from 'phosphor-react';
import MultiSelect from '../components/inputs/MultiSelect';
import { SongType } from '@/reducers/songs/types';

export default function Playlist() {
  const { songs, playlists, fetchPlaylists, addPlaylist } = useStreamingContext();
  const [name, setName] = useState<string>('');
  // const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState<SongType[]| undefined>([]);

  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(undefined); // Inicializa com 'false'
  const [selectedOption, setSelectedOption] = useState<string>(''); // Estado para armazenar a opção selecionada

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOption(value); // Armazena a opção selecionada
    setIsPrivate(value === 'sim'); // Atualiza o estado isPrivate com base na opção
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist= () => {
    console.log(name , isPrivate , selectedSongs)
    if (name && isPrivate!= undefined ) {
      addPlaylist({name, isPrivate, songs:selectedSongs}); // Usa 'isPrivate' ao criar a playlist
      setName(''); // Limpa o campo de nome
      setIsPrivate(false);
      setSelectedSongs(undefined);
      setSelectedOption('')
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
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-200" />
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
                items={songs}
                onSelectionChange={(selected) => setSelectedSongs(selected)}
                resetSelection={selectedSongs == undefined}
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreatePlaylist}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
                          rounded-full h-12 flex items-center font-medium"
              >
                <FloppyDisk size={20} className="text-paragraph" />
                <span className="text-paragraph">Salvar</span>
              </button>
            </div>
            <Dialog.Close className="absolute top-2 right-2 text-xl cursor-pointer">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <ListContainer>
        {playlists?.map((playlist, index) => (
          <PlaylistItem 
            key={playlist['@key'] || `playlist-${index}`} 
            name={playlist.name} 
            isPrivate={playlist.private} 
            id={playlist['@key']} 
            songsOfPlaylist={playlist.songs} />
        ))}
      </ListContainer>
    </div>
  );
}
