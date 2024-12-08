'use client';

import { useEffect, useRef, useState } from "react";
import { NotePencil, Trash, FloppyDisk, XCircle } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';
import Image from "next/image";

interface AlbumItemProps {
  name: string;
  year: string;
  id: string;
}

export default function AlbumItem({ name, year, id }: AlbumItemProps) {
  const { removeAlbum, fetchAlbum, editAlbum } = useStreamingContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newYear, setNewYear] = useState(year);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    editAlbum(id, (year = newYear));
    setIsEditing(false);
    fetchAlbum();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    removeAlbum(id);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const defaultImage = `https://picsum.photos/300/200?random=${id}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col gap-4 w-full sm:w-[220px] md:w-[250px] lg:w-[300px]">
      {/* Imagem do Álbum */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
        <Image
          src={defaultImage}
          alt={`${name}'s cover`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Nome e Ano */}
      <div>
        <p className="text-customBg text-xl font-semibold">{name}</p>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="mt-2 text-customBg text-lg font-medium border-2 border-gray-300 p-2 rounded-md w-full"
          />
        ) : (
          <p className="text-customBg text-lg">{year}</p>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md p-2 transition-colors"
            >
              <FloppyDisk size={20} />
              <span className="ml-2">Salvar</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-md p-2 transition-colors"
            >
              <XCircle size={20} />
              <span className="ml-2">Cancelar</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white rounded-md p-2 transition-colors"
            >
              <NotePencil size={20} />
              <span className="ml-2">Editar</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition-colors"
            >
              <Trash size={20} />
              <span className="ml-2">Excluir</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
