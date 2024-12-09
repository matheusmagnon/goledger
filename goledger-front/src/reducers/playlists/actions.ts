import { PlaylistType, UpdatePlaylistType } from "@/types/playlist";

export enum PlaylistActionType {
  FETCH_PLAYLIST = 'FETCH_PLAYLIST',
  ADD_PLAYLIST = 'ADD_PLAYLIST',
  REMOVE_PLAYLIST = 'REMOVE_PLAYLIST',
  UPDATE_PLAYLIST = 'UPDATE_PLAYLIST',
}

export type PlaylistAction =
  | { type: PlaylistActionType.FETCH_PLAYLIST; payload: PlaylistType[] }
  | { type: PlaylistActionType.ADD_PLAYLIST; payload: PlaylistType }
  | { type: PlaylistActionType.REMOVE_PLAYLIST; payload: string }
  | { type: PlaylistActionType.UPDATE_PLAYLIST; payload: UpdatePlaylistType };
