'use client';

import { NotePencil } from "phosphor-react";
import EditArtistModal from "./Modals/EditArtistModal";
import { useState } from "react";
import Image from "next/image";

interface PlaylistSongsProps {
    albums?: {
        "@key": string;
        name: string;
        year: string;
    }[] | null;
    artistName: string;
    artistCountry: string
    artistId: string
}



export default function ArtistAlbum({ albums, artistName, artistCountry, artistId }: PlaylistSongsProps) {
    const [isEditing, setIsEditing] = useState(false);

const defaultImage = `https://picsum.photos/300/200?random=${artistId}`;

    return (
        <div className="w-2/3 bg-gray-100 flex flex-col p-4 overflow-y-auto rounded-xl">
            {albums ? (
                <>
                    <div className="flex items-center mb-4">
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{artistName}</h2>
                            <p className="text-gray-600 font-semibold">{artistCountry}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-600 hover:bg-gray-700 cursor-pointer w-fit transition-colors p-2 rounded-full flex items-center mb-4"
                    >
                        <NotePencil size={20} className="text-white" weight='bold' />
                        <p className='text-white ml-2'>Editar Artista</p>
                    </button>

                    <EditArtistModal
                        isOpen={isEditing}
                        onClose={() => setIsEditing(false)}
                        artistName={artistName}
                        artistId={artistId}
                    />

                    <ul className="mt-6 space-y-4">
                        { albums.length> 0 && (<h1 className="text-xl font-bold">Albums</h1>)}
                        { albums.length== 0 && (<h1 className="text-xl font-bold">Artista sem álbums</h1>)}
                        {albums?.map((album) => (
                            <li
                                key={album['@key']}
                                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={defaultImage}
                                        alt={`${album.name} cover`}
                                        className="w-16 h-16 object-cover rounded-md"
                                        width={64}
                                        height={64}
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">{album.name}</p>
                                        <p className="text-sm text-gray-500">{album.year}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </>
            ) : (
                <p className="text-gray-500">Selecione uma playlist para ver as músicas.</p>
            )}
        </div>
    );
}
