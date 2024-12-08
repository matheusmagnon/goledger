"use client";

import { createContext, ReactNode, useContext, useReducer } from 'react';
import { toast } from 'sonner';
import { getArtists, createArtist, deleteArtist, updateArtist } from '../services/artistService';
import { getAlbums, createAlbum, deleteAlbum, updateAlbum } from '../services/albumsService';
import { getSongs, createSong, deleteSong } from '../services/songsService';
import { getPlaylists, deletePlaylist, createPlaylist, updatePlaylist } from '../services/playlistService';
import { artistsReducer } from '@/reducers/artists/reducer';
import { ArtistActionType } from '@/reducers/artists/actions';
import { Artist, UpdateArtistType } from '@/reducers/artists/types';
import { Album } from '@/reducers/albums/types';
import { albumsReducer } from '@/reducers/albums/reducer';
import { AlbumActionType } from '@/reducers/albums/actions';
import { songsReducer } from '@/reducers/songs/reducer';
import { SongType } from '@/reducers/songs/types';
import { SongActionType } from '@/reducers/songs/actions';
import { CreatePlaylistType, PlaylistType, UpdatePlaylistType } from '@/reducers/playlists/types';
import { playlistsReducer } from '@/reducers/playlists/reducer';
import { PlaylistActionType } from '@/reducers/playlists/actions';

type StreamingContextType = {
  artists: Artist[];
  addArtist: (name: string, country: string) => void;
  fetchArtists: () => void;
  removeArtist: (key: string) => void;
  editArtist: (data: UpdateArtistType) => void;
  fetchAlbum: () => void;
  addAlbum: (name: string, year: string, artistSelected?: string) => void;
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
  addPlaylist: (data: CreatePlaylistType) => void;
  editPlaylist: (data: UpdatePlaylistType) => void;
};

interface StreamingProviderProviderProps {
  children: ReactNode;
}

const StreamingContext = createContext<StreamingContextType | undefined>(undefined);

const initialArtistsState: Artist[] = [];
const initialAlbumsState: Album[] = [];
const initialSongsState: SongType[] = [];
const initialPlaylistsState: PlaylistType[] = [];


export const StreamingProvider = ({ children }: StreamingProviderProviderProps) => {
  const [artists, dispatchArtist] = useReducer(artistsReducer, initialArtistsState);
  const [albums, dispatchAlbum] = useReducer(albumsReducer, initialAlbumsState);
  const [songs, dispatchSong] = useReducer(songsReducer, initialSongsState);
  const [playlists, dispatchPlaylists] = useReducer(playlistsReducer, initialPlaylistsState);
  // const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  const fetchArtists = async () => {
    try {
      const artists = await getArtists()
      dispatchArtist({ 
        type: ArtistActionType.FETCH_ARTISTS, 
        payload: artists 
      });
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const addArtist = async (name: string, country: string) => {
    try {
      const newArtist: Artist = await createArtist({ name, country });
      dispatchArtist({ type: ArtistActionType.ADD_ARTIST, payload: newArtist });
      toast.success('Artista criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const removeArtist = async (key: string) => {
    try {
      await deleteArtist(key);
      // fetchArtists();
      dispatchArtist({ type: ArtistActionType.REMOVE_ARTIST, payload: key });
      toast.success('Artista deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o artista:', error);
      toast.error(`Erro ao excluir o artista ${error}`);
    }
  };

  const editArtist = async (artistToUpdate: UpdateArtistType) => {
    try {
      await updateArtist(artistToUpdate);
      const existingArtist = artists.find(artist => artist['@key'] === artistToUpdate['@key']);
      if (!existingArtist) {
        throw new Error('Artista não encontrado');
      }
  
      dispatchArtist({
        type: ArtistActionType.UPDATE_ARTIST, 
        payload: { 
          ...existingArtist, 
          ...artistToUpdate,
        },
      });
      toast.success('Artista editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar o Artista:', error);
    }
  };

  const addAlbum = async (name: string, year: string, artistSelected: string) => {
    try {
      const newAlbum = await createAlbum({ name, year, artistSelected });
      dispatchAlbum({ type: AlbumActionType.ADD_ALBUM, payload: newAlbum });
      fetchAlbum(); 
      toast.success('Álbum criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const fetchAlbum = async () => {
    try {
      const albums = await getAlbums();
      dispatchAlbum({ type: AlbumActionType.FETCH_ALBUMS, payload: albums });
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const removeAlbum = async (key: string) => {
    try {
      await deleteAlbum(key);
      // fetchAlbum();
      dispatchAlbum({ type: AlbumActionType.REMOVE_ALBUM, payload: key });
      toast.success('Álbum deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Álbum:', error);
    }
  };

  const editAlbum = async (id: string, year: string) => {
    try {
      await updateAlbum({ id, year });
      const existingAlbum = albums.find(album => album['@key'] === id);
      if (!existingAlbum) {
        throw new Error('Álbum não encontrado');
      }
      dispatchAlbum({
        type: AlbumActionType.UPDATE_ALBUM, 
        payload: {
          ...existingAlbum,
          '@key': id,
          year
        },
      });
      toast.success('Álbum editado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Álbum:', error);
    }
  };


  const fetchSongs = async () => {
    try {
      const albums = await getAlbums();
      dispatchAlbum({ type: AlbumActionType.FETCH_ALBUMS, payload: albums });

      const songs = await getSongs();
      const songsWithAlbumNames = songs.map(song => {
        // console.log('album', song.album['@key'])
        const album = albums.find(album => album["@key"] === song.album["@key"]);
        return {
          ...song,
          album: {
            ...song.album,
            name: album ? album.name : "Álbum Desconhecido",
          },
        };
      });

      dispatchSong({ type: SongActionType.FETCH_SONGS, payload: songsWithAlbumNames });

    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const addSong = async (name: string, AlbumId: string) => {
    try {
      const newSong = await createSong({ name, AlbumId });
      dispatchSong({ type: SongActionType.ADD_SONG, payload: newSong });
      fetchSongs(); 
      toast.success('Música criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o artista:', error);
    }
  };

  const removeSong = async (key: string) => {
    try {
      await deleteSong(key);
      dispatchSong({ type: SongActionType.REMOVE_SONG, payload: key });
      toast.success('Música deletada com sucesso!');
    } catch (error) {
      toast.error(`Não foi possível deletar a música!' 
         ${error}`);

    }
  };

  const fetchPlaylists = async () => {
    try {
      const songs = await getSongs();
      dispatchSong({ type: SongActionType.FETCH_SONGS, payload: songs });
  
      const playlists = await getPlaylists();
  
      const playlistsWithSongNames = playlists.map(playlist => {
        const updatedSongs = playlist.songs?.map(song => {
          const matchingSong = songs.find(s => s['@key'] === song['@key']);
          return {
            ...song,
            name: matchingSong ? matchingSong.name : "Música Desconhecida",
          };
        }) || [];
  
        console.log('updatedSongs', updatedSongs);
        return {
          ...playlist,
          songs: updatedSongs,
        };
      });
  
      dispatchPlaylists({ type: PlaylistActionType.FETCH_PLAYLIST, payload: playlistsWithSongNames });
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };
  
  const removePlaylist = async (key: string) => {
    try {
      await deletePlaylist(key);
      dispatchPlaylists({ type: PlaylistActionType.REMOVE_PLAYLIST, payload: key });
      toast.success('Playlist deletada com sucesso!');
    } catch (error) {
      toast.error(`Não foi possível deletar a Playlist!' 
         ${error}`);
    }
  };

  const editPlaylist = async (UpdatePlaylistData: UpdatePlaylistType) => {
    console.log('editPlaylist', UpdatePlaylistData);
    try {
      await updatePlaylist(UpdatePlaylistData);
      fetchPlaylists();
      dispatchPlaylists({ type: PlaylistActionType.UPDATE_PLAYLIST, payload: UpdatePlaylistData });
      toast.success('Playlist editado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o Playlist:', error);
    }
  };

  const addPlaylist = async (createPlaylistData: CreatePlaylistType) => {
    console.log('addPlaylist', createPlaylistData);
    try {
      const createdPlaylist = await createPlaylist(createPlaylistData);
      dispatchPlaylists({ type: PlaylistActionType.ADD_PLAYLIST, payload: createdPlaylist });
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
        editArtist,
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
export const useStreamingContext = (): StreamingContextType => {
  const context = useContext(StreamingContext);
  if (!context) {
    throw new Error('useArtistContext deve ser usado dentro de um StreamingProvider');
  }
  return context;
};
