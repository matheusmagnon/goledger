// services/artistService.ts
import apiClient from '../lib/apiClient';

type Artist = {
  id: string;
  name: string;
  country: string;
};

type CreateArtistData = {
  name: string;
  country: string;
};

type UpdateArtistData = {
  name?: string;
  country?: string;
};

// type DeleteArtistData = {
//   '@assetType': string;
//   '@key': string;
// };

// Função para obter os artistas
export const getArtists = async (): Promise<Artist[]> => {
  const response = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'artist',
      },
    },
  });
  return response.data;
};

// Função para criar um artista
export const createArtist = async (artistData: CreateArtistData): Promise<unknown> => {
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
  return response.data;
};

// Função para atualizar um artista
export const updateArtist = async (key: string, artistData: UpdateArtistData): Promise<unknown> => {
  console.log('artistData', artistData, key);
  const response = await apiClient.put('/invoke/updateAsset', {
    update: {
      '@assetType': 'artist',
      '@key': key,
      ...artistData,
    },
  });
  return response.data;
};

// Função para excluir um artista
export const deleteArtist = async (key: string): Promise<unknown> => {
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
