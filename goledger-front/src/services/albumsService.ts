import { AxiosResponse } from 'axios';
import apiClient from '../lib/apiClient';

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

type CreateAlbumData = {
  name: string;
  year: string;
  keyArtist: string;
};

type UpdateAlbumData = {
  id: string;
  year?: string;
};

export const getAlbums = async (): Promise<Album[]> => {
  const { data }: AxiosResponse = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'album',
      },
    },
  });
  return data.result;
};


export const createAlbum = async (albumData: CreateAlbumData): Promise<Album> => {
  const { name, year, keyArtist } = albumData
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "album",
        "name": name,
        "artist": {
          "@key": keyArtist,
        },
        "year": year
      }
    ]
  });
  return response.data;
};


export const updateAlbum = async (albumData: UpdateAlbumData): Promise<unknown> => {
  const response = await apiClient.put('/invoke/updateAsset', {
    update: {
      '@assetType': 'album',
      '@key': albumData.id,
      year: albumData.year,
      ...albumData,
    },
  });
  console.log(' response.data', response.data)
  return response.data;
};


export const deleteAlbum = async (key: string): Promise<unknown> => {
  const response = await apiClient.delete('/invoke/deleteAsset', {
    data: {
      key: {
        '@assetType': 'album',
        '@key': key,
      },
    },
  });
  return response.data;
};
