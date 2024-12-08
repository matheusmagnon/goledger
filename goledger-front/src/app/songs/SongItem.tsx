'use client';

import { Trash } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';

interface SongItemProps {
  name: string;
  id: string;
  AlbumName?: string;
}

export default function SongItem({ name, id, AlbumName = "Álbum Desconhecido" }: SongItemProps) {
  const { removeSong } = useStreamingContext();

  const handleDelete = () => removeSong(id);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-2 flex flex-col gap-2 w-full sm:w-[195px]">
      <div className="flex justify-between items-start">
        <p className="text-customBg text-xl font-semibold flex-1">{name}</p>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md p-1.5 transition-colors"
        >
          <Trash size={20} />
        </button>
      </div>

      <p className="text-customBg text-md">{AlbumName}</p>
    </div>
  );
}
