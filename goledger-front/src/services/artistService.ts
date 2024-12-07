// services/artistService.ts
import { Artist, UpdateArtistType } from '@/reducers/artists/types';
import apiClient from '../lib/apiClient';
import { AxiosResponse } from 'axios';

type CreateArtistData = {
  name: string;
  country: string;
};



// type DeleteArtistData = {
//   '@assetType': string;
//   '@key': string;
// };

// Função para obter os artistas
export const getArtists = async (): Promise<Artist[]> => {
  const { data }: AxiosResponse = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'artist',
      },
    },
  });
  return data.result;
};

// Função para criar um artista
export const createArtist = async (artistData: CreateArtistData): Promise<Artist> => {
  console.log('artistData', artistData);
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "artist",
        "name": artistData.name,
        "country": artistData.country
      }
    ]
  });
  return response.data[0];
};

// Função para atualizar um artista
export const updateArtist = async ( artistData: UpdateArtistType): Promise<Artist> => {
  console.log('artistData', artistData);
  const response = await apiClient.put('/invoke/updateAsset', {
    update: {
      '@assetType': 'artist',
      ...artistData,
    },
  });
  return response.data;
};

// Função para excluir um artista
export const deleteArtist = async (key: string): Promise<Artist> => {
  const response = await apiClient.delete('/invoke/deleteAsset', {
    data: {
      key: {
        '@assetType': 'artist',
        '@key': key,
      },
    },
  });
  return response.data;
};
