import { CreatePlaylistType, PlaylistType, UpdatePlaylistType } from '@/reducers/playlists/types';
import apiClient from '../lib/apiClient';
import { AxiosResponse } from 'axios';

export const getPlaylists = async (): Promise<PlaylistType[]> => {
  const {data}: AxiosResponse = await apiClient.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'playlist',
      },
    },
  });
  return data.result;
};


export const createPlaylist = async (playlistData: CreatePlaylistType): Promise<PlaylistType> => {
  const {name, songs,isPrivate} = playlistData
  const response = await apiClient.post('/invoke/createAsset', {
    "asset": [
      {
        "@assetType": "playlist",
        "name": name,
        "songs": songs,
        "private": isPrivate,
      }
    ]
  });
  return response.data;
};


export const updatePlaylist = async (playlistData: UpdatePlaylistType): Promise<PlaylistType> => {
  const { isPrivate, songs} = playlistData;
  const response = await apiClient.put('/invoke/updateAsset', {
    update: {
      '@assetType': 'playlist',
      '@key': playlistData['@key'],
      private: isPrivate,
      songs: songs,
    },
  });
  console.log(' response.data', response.data)
  return response.data;
};


export const deletePlaylist = async (key: string): Promise<PlaylistType> => {
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
