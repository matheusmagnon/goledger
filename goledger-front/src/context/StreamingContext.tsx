"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getArtists, createArtist, deleteArtist } from '@/services/artistService';
import { getAlbums, createAlbum, deleteAlbum, updateAlbum } from '@/services/albumsService';
import { getSongs, createSong, deleteSong } from '@/services/songsService';
import { getPlaylists, deletePlaylist, createPlaylist, updatePlaylist } from '@/services/playlistService';

type artistSelectedType = {
  name: string;
  '@key': string;
};

type StreamingContextType = {
  artists: Artist[];
  addArtist: (name: string, country: string) => void;
  fetchArtists: () => void;
  removeArtist: (key: string) => void;
  fetchAlbum: () => void;
  addAlbum: (name: string, year: string, artistSelected?: artistSelectedType) => void;
  removeAlbum: (key: string) => void;
  editAlbum: (id: string, year: string) => void;
  albums: Album[];
  songs: SongType[];
  fetchSongs: () => void;
  addSong: (name: string, AlbumId: string) => void;
  removeSong: (key: string) => void;
  playlists: PlaylistType[];
  fetchPlaylists: () => void;
  removePlaylist: (key: string) => void;
  addPlaylist: (data: CreatePlaylistData) => void;
  editPlaylist: (data: UpdatePlaylistDataType) => void;
};

type Artist = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  country: string;
  name: string;
};

type Album = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  artist: {
    '@assetType': string;
    '@key': string;
  }
  year: string;
  name: string;
};

type SongType = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  album: {
    '@assetType': string;
    '@key': string;
  }
  name: string;
};

type PlaylistType = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  name: string;
  private: string;
  songs: [
    {
      '@assetType': string;
      '@key': string;
    }
  ];

};

type CreatePlaylistData = {
  name: string;
  isPrivate: boolean;
  selectedSongs?: {
    '@key': string;
  }[];
};

type UpdatePlaylistDataType = {
  id: string;
  private?: boolean;
  songs?: {
    '@key': string;
  }[];
};

const StreamingContext = createContext<StreamingContextType | undefined>(undefined);

export const StreaminProvider = ({ children }: { children: ReactNode }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  // Função para buscar artistas
  const fetchArtists = async () => {
    try {
      const { result } = await getArtists();
      //   console.log('result', result);
      setArtists(result); // Atualiza a lista de artistas
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  // Função para criar um novo artista
  const addArtist = async (name: string, country: string) => {
    try {
      await createArtist({ name, country });
      fetchArtists(); // Atualiza a lista de artistas após a criação
      toast.success('Artista criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const removeArtist = async (key: string) => {
    try {
      await deleteArtist(key);
      fetchArtists();
      toast.success('Artista deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o artista:', error);
      toast.error(`Erro ao excluir o artista ${error}`);
    }
  };


  const addAlbum = async (name: string, year: string, artistSelected: artistSelectedType) => {
    try {
      await createAlbum({ name, year, artistSelected });
      fetchAlbum(); // Atualiza a lista de artistas após a criação
      toast.success('Álbum criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const fetchAlbum = async () => {
    try {
      const { result } = await getAlbums();
      console.log('result', result);
      setAlbums(result); // Atualiza a lista de artistas
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const removeAlbum = async (key: string) => {
    try {
      await deleteAlbum(key);
      fetchAlbum();
      toast.success('Álbum deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Álbum:', error);
    }
  };

  const editAlbum = async (id: string, year: string) => {
    try {
      await updateAlbum({ id, year });
      fetchAlbum();
      toast.success('Álbum editado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Álbum:', error);
    }
  };


  const fetchSongs = async () => {
    try {
      const { result } = await getSongs();
      console.log('result', result);
      setSongs(result);
      fetchPlaylists()
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const addSong = async (name: string, AlbumId: string) => {
    console.log('name', name);
    console.log('AlbumId', AlbumId);
    try {
      await createSong({ name, AlbumId });
      fetchSongs(); // Atualiza a lista de artistas após a criação
      toast.success('Música criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const removeSong = async (key: string) => {
    try {
      await deleteSong(key);
      fetchSongs();
      toast.success('Música deletada com sucesso!');
    } catch (error) {
      toast.error(`Não foi possível deletar a música!' 
         ${error}`);

    }
  };

  const fetchPlaylists = async () => {
 
    try {
      // const  resultSongs  = await getSongs();
      // console.log('resultSongs', resultSongs);
      // setSongs(resultSongs.resultSongs);

      const { result } = await getPlaylists();
      console.log('result playlist', result);
      const playlistsWithSongNames = result.map(playlist => {
        const songsWithNames = playlist.songs.map(song => {
          const songDetails = songs.find(s => s['@key'] === song['@key']);

          if (songDetails) {
            return { name: songDetails.name, '@key': songDetails['@key'] };
          } else {
            return null;
          }
        });

        return {
          ...playlist,
          songs: songsWithNames.filter(song => song !== null),
        };
      });

      console.log('playlistsWithSongNames', playlistsWithSongNames);

      // Update the state with playlists already containing song names
      setPlaylists(playlistsWithSongNames);

    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const removePlaylist = async (key: string) => {
    try {
      await deletePlaylist(key);
      fetchPlaylists();
      toast.success('Playlist deletada com sucesso!');
    } catch (error) {
      toast.error(`Não foi possível deletar a Playlist!' 
         ${error}`);
    }
  };

  const editPlaylist = async (UpdatePlaylistData: UpdatePlaylistDataType) => {
    try {
      await updatePlaylist(UpdatePlaylistData);
      fetchPlaylists();
      toast.success('Playlist editado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Playlist:', error);
    }
  };


  const addPlaylist = async (createPlaylistData: CreatePlaylistData) => {
    console.log('addPlaylist', createPlaylistData);
    // const {name, isPrivate, selectedSongs} = createPlaylistData 
    try {
      await createPlaylist(createPlaylistData);
      fetchPlaylists();
      toast.success('Playlist criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar a playlist:', error);
    }
  };


  return (
    <StreamingContext.Provider
      value={{
        artists,
        addArtist,
        fetchArtists,
        removeArtist,
        albums,
        addAlbum,
        fetchAlbum,
        removeAlbum,
        editAlbum,
        songs,
        fetchSongs,
        addSong,
        removeSong,
        playlists,
        fetchPlaylists,
        removePlaylist,
        addPlaylist,
        editPlaylist
      }}>
      {children}
    </StreamingContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useStreaminContext = (): StreamingContextType => {
  const context = useContext(StreamingContext);
  if (!context) {
    throw new Error('useArtistContext deve ser usado dentro de um StreamingProvider');
  }
  return context;
};
