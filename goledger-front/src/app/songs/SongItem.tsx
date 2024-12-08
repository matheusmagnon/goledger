'use client';

import { useEffect, useRef, useState } from "react";
import { Trash, XCircle, CheckCircle } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';

interface SongItemProps {
  name: string;
  id: string;
  AlbumName?: string;
}

export default function SongItem({ name, AlbumName, id }: SongItemProps) {
  const { removeSong } = useStreamingContext();
  const [isEditing, setIsEditing] = useState(false);
  // const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  // const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  // const [isHovered, setIsHovered] = useState(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  console.log('AlbumName', AlbumName)
  // useEffect(() => {
  //   if (isEditing && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isEditing]);

  const handleDelete = async () => {
    removeSong(id);
  };

  // const handlePlaylistSelection = (playlistId: string) => {
  //   setSelectedPlaylists((prev) =>
  //     prev.includes(playlistId)
  //       ? prev.filter((id) => id !== playlistId)
  //       : [...prev, playlistId]
  //   );
  // };

  // const handleSaveChanges = () => {
  //   selectedPlaylists.forEach((playlistId) => {
  //     editPlaylist({ id: playlistId, songs: [{ "@key": id }] });
  //   });
  //   setSelectedPlaylists([]);
  //   setShowPlaylistModal(false);
  // };

  // const handleCancelChanges = () => {
  //   setSelectedPlaylists([]);
  //   setShowPlaylistModal(false);
  // };

  return (
    <div
      className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-auto bg-white rounded-lg p-2 px-2 flex items-center hover:bg-gray-100 transition-colors">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col items-center">
            <p className="text-customBg text-xl font-bold">{name}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col items-center">
              <p className="text-customBg text-xl font-bold">{AlbumName}</p>
            </div>
            <div className="flex justify-between gap-2">
              <div className="relative">
                <button
                  className="p-3 rounded-full cursor-pointer mr-48 "
                  // onClick={() => setShowPlaylistModal((prev) => !prev)}
                >
                  <CheckCircle weight="fill" className="text-green-800 font-bold " size={20} />
                </button>
                {/* {showPlaylistModal && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
                    {playlists.length > 0 ? (
                      <ul className="max-h-72 overflow-y-auto">
                        {playlists.map((playlist) => {
                          const isSongInPlaylist = !!playlist.songs.find((song) => song["@key"] === id);
                          const isSelected = selectedPlaylists.includes(playlist["@key"]);

                          return (
                            <li
                              key={playlist["@key"]}
                              className={`p-2 cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-gray-200" : ""}`}
                              onClick={() => handlePlaylistSelection(playlist["@key"])}
                            >
                              {isHovered && (
                                <input
                                  type="checkbox"
                                  checked={isSelected || isSongInPlaylist}
                                  onChange={() => handlePlaylistSelection(playlist["@key"])}
                                  className="mr-2"
                                />
                              )}
                              {playlist.name}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="p-4 text-gray-500 text-center">Nenhuma playlist encontrada.</p>
                    )}
                    {/* Botões de ação */}
                    {/* <div className="p-2 flex justify-end gap-2">
                      <button
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        onClick={handleCancelChanges}
                      >
                        Cancelar
                      </button>
                      {/* {selectedPlaylists.length > 0 && (
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          onClick={handleSaveChanges}
                        >
                          Salvar
                        </button>
                      )} */}
                    {/* </div>
                  </div> */}
                {/* )} */} 
              </div>
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="gap-2 bg-slate-600 hover:bg-slate-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                >
                  <XCircle className="text-paragraph" size={20} />
                  <span className="text-paragraph">Cancelar</span>
                </button>
              ) : (
                <button
                  onClick={handleDelete}
                  className="gap-2 bg-slate-600 hover:bg-slate-500 hover:text-paragraph cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                >
                  <Trash className="text-paragraph" size={20} />
                  <span className="text-paragraph">Excluir</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
