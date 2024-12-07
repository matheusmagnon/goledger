import { Artist } from "./types";

// Tipos de ações para o reducer
export enum ArtistActionType {
    FETCH_ARTISTS = 'FETCH_ARTISTS',
    ADD_ARTIST = 'ADD_ARTIST',
    REMOVE_ARTIST = 'REMOVE_ARTIST',
  }
  
  // Tipos de dados para o reducer
export type ArtistAction =
| { type: ArtistActionType.FETCH_ARTISTS; payload: Artist[] }
| { type: ArtistActionType.ADD_ARTIST; payload: Artist }
| { type: ArtistActionType.REMOVE_ARTIST; payload: string };
