'use client';

import { useEffect, useRef, useState } from "react";
import { Trash, XCircle } from "phosphor-react";
import { useStreaminContext } from '@/context/StreamingContext';
// import { updateAlbum } from "@/services/albumsService";


interface SongItemProps {
  name: string;
  id: string;
  AlbumName?: string;
}

export default function SongItem({ name, AlbumName, id }: SongItemProps) {
  const { removeSong } = useStreaminContext();
  const [isEditing, setIsEditing] = useState(false);
  // const [newYear, setNewYear] = useState(year);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Foca no campo
    }
  }, [isEditing]);

  // Função para excluir o artista
  const handleDelete = async () => {
    removeSong(id);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
      <div className="w-full h-auto bg-white rounded-lg p-2 px-2 flex items-center hover:bg-gray-100 transition-colors">
        <div className="w-full flex justify-between items-center ">
          <div className="flex flex-col items-center">
            <p className="text-customBg text-xl font-bold">{name}</p>
          </div>
          <div className="flex items-center justify-between gap-20">
            <div className="flex flex-col items-center">
              <p className="text-customBg text-xl font-bold">{AlbumName}</p>
            </div>
            <div className="flex justify-between gap-4">

              {isEditing ? (
                <button
                  onClick={handleCancel}
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
