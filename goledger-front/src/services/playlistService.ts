import apiClient from '../lib/apiClient';

type Playlist = {
  id: string;
  name: string;
  songs: string[];
  isPrivate: boolean;
};

type artistSelectedType = {
  name: string;
  '@key': string;
};

type CreateAlbumData = {
  name: string;
  year: string;
  artistSelected: artistSelectedType;
};

type UpdateAlbumData = {
  id: string;
  year?: string;
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


export const createAlbum = async (albumData: CreateAlbumData): Promise<unknown> => {
  const { name, year, artistSelected } = albumData
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "album",
        "name": name,
        "artist": {
          "@key": artistSelected['@key'],
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
