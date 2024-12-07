
import { ArtistAction, ArtistActionType } from "./actions";
import { Artist } from "./types";
  
type ArtistState = Artist[];

 // Reducer para gerenciar artists
 export const artistsReducer = (state: ArtistState, action: ArtistAction): ArtistState => {
  switch (action.type) {
    case ArtistActionType.FETCH_ARTISTS:
      return action.payload;
    case ArtistActionType.ADD_ARTIST:
      return [...state, action.payload];
    case ArtistActionType.REMOVE_ARTIST:
      return state.filter((artist) => artist['@key'] !== action.payload);
    case ArtistActionType.UPDATE_ARTIST:
      return state.map((artist) =>
        artist['@key'] === action.payload['@key'] ? { ...artist, ...action.payload } : artist
      );
  }
}