import { Album, UpdateAlbumType } from "./types";

// Tipos de ações para o reducer de albums
export enum AlbumActionType {
  FETCH_ALBUMS = 'FETCH_ALBUMS',
  ADD_ALBUM = 'ADD_ALBUM',
  REMOVE_ALBUM = 'REMOVE_ALBUM',
  UPDATE_ALBUM = 'UPDATE_ALBUM',
}

// Tipos de dados para o reducer de albums
export type AlbumAction =
  | { type: AlbumActionType.FETCH_ALBUMS; payload: Album[] }
  | { type: AlbumActionType.ADD_ALBUM; payload: Album }
  | { type: AlbumActionType.REMOVE_ALBUM; payload: string }
  | { type: AlbumActionType.UPDATE_ALBUM; payload: UpdateAlbumType };
