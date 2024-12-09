'use client';

import { Trash } from "phosphor-react"; 
import { useStreamingContext } from '@/context/StreamingContext';
import { ItemToSelect } from "@/types/global";
import Image from "next/image";

interface PlaylistItemProps {
  id: string;
  name: string;
  isPrivate: boolean;
  songsOfPlaylist?: ItemToSelect[];
  playlistImage?: string
}

export default function PlaylistItem({ name, isPrivate, id, playlistImage }: PlaylistItemProps) {
  const { removePlaylist } = useStreamingContext();

  const handleDelete = async () => {
    removePlaylist(id);
  };
  return (
    <div className="relative group w-full h-auto z-10">
      <div className="w-full rounded-md p-4 flex items-center bg-gray-700 hover:bg-gray-600 transition-colors">
        <div className="relative rounded-lg pr-2">
          <Image className="rounded-lg"
            width={70}
            height={70}
            src={playlistImage || ''}
            alt={`${name}'s image`}
          />
        </div>
        <div className="">
          <p className="text-white text-lg font-bold">{name}</p>
          <p className="text-white text-sm">
            {isPrivate ? "Playlist Privada" : "Playlist Pública"}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 cursor-pointer transition-colors p-2 rounded-full flex items-center"
        >
          <Trash size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
