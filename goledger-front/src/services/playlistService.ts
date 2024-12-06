import apiClient from '../lib/apiClient';

type Playlist = {
  id: string;
  name: string;
  songs: string[];
  isPrivate: boolean;
};

type CreatePlaylistData = {
  name: string;
  isPrivate: boolean;
  selectedSongs?: {
    '@key': string;
  }[];
};

type UpdatePlaylistData = {
  id: string;
  private: boolean;
  songs: {
    '@key': string;
  }[];
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  const response = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'playlist',
      },
    },
  });
  return response.data;
};


export const createPlaylist = async (playlistData: CreatePlaylistData): Promise<unknown> => {
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "playlist",
        "name": playlistData.name,
        "songs": playlistData.selectedSongs,
        "private": playlistData.isPrivate,
      }
    ]
  });
  return response.data;
};


export const updatePlaylist = async (playlistData: UpdatePlaylistData): Promise<unknown> => {
  const response = await apiClient.put('/invoke/updateAsset', {
    update: {
      '@assetType': 'playlist',
      '@key': playlistData.id,
      private: playlistData.private,
      songs:playlistData.songs,
    },
  });
  console.log(' response.data', response.data)
  return response.data;
};


export const deletePlaylist = async (key: string): Promise<unknown> => {
  const response = await apiClient.delete('/invoke/deleteAsset', {
    data: {
      key: {
        '@assetType': 'playlist',
        '@key': key,
      },
    },
  });
  return response.data;
};
