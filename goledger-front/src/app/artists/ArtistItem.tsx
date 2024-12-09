'use client';

import { Trash } from "phosphor-react";
import { useStreamingContext } from '../../context/StreamingContext';
import Image from "next/image";

interface ArtistItemProps {
  name: string;
  country: string;
  id: string;
}

export default function ArtistItem({ name, country, id }: ArtistItemProps) {
  const { removeArtist } = useStreamingContext();

  const handleDelete = async () => {
    removeArtist(id);
  };


  const defaultImage = `https://picsum.photos/300/200?random=${id}`;

  return (
    <div className="relative group w-full h-auto z-10">
      <div className="w-full rounded-md p-2 flex items-center justify-between bg-gray-700 hover:bg-gray-600 transition-colors">
        <div className="flex items-center gap-4 overflow-hidden rounded-t-lg">
          <Image
            className="rounded-lg"
            width={70}
            height={70}
            src={defaultImage}
            alt={`${name}'s image`}
          />
          <div className="">
            <p className="text-white text-lg font-semibold">{name}</p>

            <p className="text-white text-sm">{country}</p>
          </div>
        </div>


        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <>
            <button title="Clique para excluir o artista"
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              <Trash size={20} />
            </button>
          </>
        </div>
      </div>
    </div>
  );
}
