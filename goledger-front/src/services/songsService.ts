import { SongType } from '@/reducers/songs/types';
import apiClient from '../lib/apiClient';
import { AxiosResponse } from 'axios';

type CreateSongData = {
  name: string;
  AlbumId: string;
};

export const getSongs = async (): Promise<SongType[]> => {
  const { data }: AxiosResponse = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'song',
      },
    },
  });
  return data.result;
};

export const createSong = async (songData: CreateSongData): Promise<SongType> => {
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
