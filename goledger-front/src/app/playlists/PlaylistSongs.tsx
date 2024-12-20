'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ItemToSelect } from '@/types/global';
import { PlusCircle, Trash, CircleNotch } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';
import Image from 'next/image';
import EditPlaylistModal from './EditPlaylistModal';

interface PlaylistSongsProps {
    playlistId: string;
    playlistName?: string;
    songsOfPlaylist: ItemToSelect[] | undefined;
    imagePlaylist?: string;
    isPrivate?: boolean;
}

export default function PlaylistSongs({
    playlistName,
    songsOfPlaylist,
    playlistId,
    imagePlaylist,
    isPrivate,
}: PlaylistSongsProps) {
    const { editPlaylist, songs } = useStreamingContext();
    const [isEditing, setIsEditing] = useState(false);
    const [loadingSongKey, setLoadingSongKey] = useState<string | null>(null); 
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleDeleteSong = (songKey: string) => {
        setLoadingSongKey(songKey);
        const updatedSongs = songsOfPlaylist?.filter((song) => song['@key'] !== songKey);

        editPlaylist({ '@key': playlistId, isPrivate, songs: updatedSongs });
        setTimeout(() => {
            setLoadingSongKey(null);
        }, 3000);
    };

    const songsToSelection = songs
        .filter((song) =>
            !songsOfPlaylist?.some(playlistSong => playlistSong['@key'] === song['@key'])
        )
        .map((song) => ({
            name: song.name,
            '@key': song['@key']
        }));
        const defaultImage = `https://picsum.photos/300/200?random=${playlistId}`;

    return (
        <div className="w-2/3 bg-gray-100 flex flex-col p-4 overflow-y-auto rounded-xl">
            {songs ? (
                <>
                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                            <Image
                                className="rounded-lg"
                                width={100}
                                height={100}
                                src={imagePlaylist || ''}
                                alt={`${playlistName}'s image`}
                            />
                        </div>

                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{playlistName}</h2>
                            <p className="text-gray-600 font-semibold">{songsOfPlaylist?.length} músicas</p>
                            <p className="text-gray-500 font-semibold">Última atualização: 12/10/2024</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-500 hover:bg-gray-600 cursor-pointer w-fit transition-colors p-2 rounded-full flex items-center mb-4"
                    >
                        <PlusCircle size={20} className="text-white" weight='bold' />
                        <p className='text-white ml-2'>Adicionar músicas</p>
                    </button>

                    <EditPlaylistModal
                        isOpen={isEditing}
                        onClose={() => setIsEditing(false)}
                        playlistId={playlistId}
                        songsToSelection={songsToSelection}
                        songsOfPlaylist={songsOfPlaylist}
                    />

                    <ul className="mt-6 space-y-4">
                        {songsOfPlaylist?.map((song) => (
                            <li
                                key={song['@key']}
                                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className=" flex items-center justify-center bg-slate-700 rounded-full">
                                        <Image
                                            src={defaultImage}
                                            className="w-16 h-16 object-cover rounded-md"
                                            width={64}
                                            height={64} alt={''}                                    />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">{song.name}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDeleteSong(song['@key'])}
                                    className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                    title="Excluir música"
                                >
                                    {loadingSongKey === song['@key'] ? (
                                        <CircleNotch className="animate-spin" weight="bold" color="white" size={20} />
                                    ) : (
                                        <Trash weight="bold" size={20} />
                                    )}
                                </button>
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
