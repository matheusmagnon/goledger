import { SongType, UpdateSongType } from "@/types/song";

export enum SongActionType {
  FETCH_SONGS = 'FETCH_SONGS',
  ADD_SONG = 'ADD_SONG',
  REMOVE_SONG = 'REMOVE_SONG',
  UPDATE_SONG = 'UPDATE_SONG',
}

export type SongAction =
  | { type: SongActionType.FETCH_SONGS; payload: SongType[] }
  | { type: SongActionType.ADD_SONG; payload: SongType }
  | { type: SongActionType.REMOVE_SONG; payload: string }
  | { type: SongActionType.UPDATE_SONG; payload: UpdateSongType };
