'use client';

import { useState, useRef, useEffect } from "react";
import { NotePencil, Trash, FloppyDisk, XCircle } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';
import * as Dialog from '@radix-ui/react-dialog';
import MultiSelect from "../components/inputs/MultiSelect";


interface songsOfPlaylist {
  '@assetType'?: string;
  '@key': string;
  name?: string;
}
interface PlaylistItemProps {
  id: string;
  name: string;
  isPrivate: boolean;
  songsOfPlaylist: {
    '@assetType'?: string;
    '@key': string;
    name?: string;
  }[];
}

export default function PlaylistItem({ name, isPrivate, id, songsOfPlaylist }: PlaylistItemProps) {
  const { removePlaylist, editPlaylist, songs } = useStreamingContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [playlistIsPrivate, setPlaylistIsPrivate] = useState<boolean | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<songsOfPlaylist[]>([]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // useEffect(() => {
  //   fetchPlaylists();
  // }, []);

  // useEffect(() => {
  //   fetchSongs();
  // }, []);

  useEffect(() => {
    // Se houver músicas na playlist, marcar como selecionadas
    if (songsOfPlaylist && songsOfPlaylist.length > 0) {
      const selectedKeys = songsOfPlaylist.map((song) => song['@key']);
      setSelectedSongs(selectedKeys);
    }
  }, [songsOfPlaylist]);

  const handleSave = async () => {
    console.log('selectedSongs', selectedSongs)
    editPlaylist({ '@key': id, isPrivate: playlistIsPrivate, songs: selectedSongs });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // setPlaylistIsPrivate(isPrivate); // Resetar para o estado original
  };

  const handleDelete = async () => {
    removePlaylist(id);
  };

  const toggleSongs = () => {
    setShowSongs(prev => !prev);
  };

  const songsToSelection = songs.map((song) => {
    return {
      name: song.name,
      '@key': song['@key']
    }
  });

  return (
    <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4 cursor-pointer">
      <div
        onClick={toggleSongs}
        className="w-full h-auto bg-white rounded-lg p-2 px-2 flex items-center hover:bg-gray-100 transition-colors"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col items-center">
            <p className="text-customBg text-lg font-bold">{name}</p>
          </div>
          <div className="flex items-center justify-between gap-20">
            <div className="flex flex-col items-center">
              {isPrivate  
              ?  <p className="text-customBg text-lg font-bold">Playlist Privada</p> 
              :  <p className="text-customBg text-lg font-bold">Playlist Pública</p>
              }
            </div>
            <div className="flex justify-between gap-4">
              <Dialog.Root>
                <Dialog.Trigger
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-slate-600 hover:bg-slate-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                >
                  <NotePencil className="text-paragraph" size={20} />
                  <span className="text-paragraph">Editar</span>
                </Dialog.Trigger>

                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
                <Dialog.Content className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-6 bg-white rounded-lg shadow-xl z-50">
                  <Dialog.Title className="text-2xl font-bold">Editar Playlist</Dialog.Title>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold">Deseja que a playlist seja privada?</label>
                    <div className="flex gap-10 pt-1">
                    <label>
                      <input
                        className="mr-1"
                        type="radio"
                        name="opcao"
                        value="sim"
                        checked={playlistIsPrivate === true}
                        onChange={() => setPlaylistIsPrivate(true)}
                      />
                      <span className="font-semibold">Sim</span>
                    </label>

                    <label>
                      <input
                        className="mr-1"
                        type="radio"
                        name="opcao"
                        value="nao"
                        checked={playlistIsPrivate === false}
                        onChange={() => setPlaylistIsPrivate(false)}
                      />
                      <span className="font-semibold">Não</span>
                    </label>
                    </div>
                    <MultiSelect
                      items={songsToSelection}
                      onSelectionChange={(selected) => setSelectedSongs(selected)}
                      resetSelection={selectedSongs === undefined}
                      selected={selectedSongs} // Passar as músicas já selecionadas
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                    >
                      <FloppyDisk size={20} className="text-paragraph" />
                      <span className="text-paragraph">Salvar</span>
                    </button>
                    <Dialog.Close asChild>
                      <button
                        onClick={handleCancel}
                        className="gap-2 bg-red-600 hover:bg-red-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium ml-4"
                      >
                        <XCircle className="text-paragraph" size={20} />
                        <span className="text-paragraph">Cancelar</span>
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
              <button
                onClick={handleDelete}
                className="gap-2 bg-slate-600 hover:bg-slate-500 hover:text-paragraph cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
              >
                <Trash className="text-paragraph" size={20} />
                <span className="text-paragraph">Excluir</span>
              </button>

            </div>
          </div>
        </div>
      </div>

      {showSongs && songsOfPlaylist && songsOfPlaylist.length > 0 && (
        <ul className="mt-2 pl-6 cursor-auto">
          {songsOfPlaylist.map(song => (
            <li key={song['@key']} className="text-gray-50">
              {song.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
