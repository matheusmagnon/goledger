import apiClient from '../lib/apiClient';

type Song = {
  id: string;
  SongId: string;
  name: string;
};

type CreateSongData = {
  name: string;
  AlbumId: string;
};

export const getSongs = async (): Promise<Song[]> => {
  const response = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'song',
      },
    },
  });
  return response.data;
};

export const createSong = async (songData: CreateSongData): Promise<unknown> => {
  console.log('songData', songData)
  const { name, AlbumId } = songData
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "song",
        "name": name,
        "album": {
          "@key": AlbumId,
        },
      }
    ]
  });
  return response.data;
};


export const deleteSong = async (key: string): Promise<unknown> => {
  const response = await apiClient.delete('/invoke/deleteAsset', {
    data: {
      key: {
        '@assetType': 'song',
        '@key': key,
      },
    },
  });
  return response.data;
};
