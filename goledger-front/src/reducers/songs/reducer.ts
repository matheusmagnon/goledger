import { SongAction, SongActionType } from "./actions";
import { SongType } from "@/types/song";

type SongState = SongType[];

export const songsReducer = (state: SongState, action: SongAction): SongState => {
  switch (action.type) {
    case SongActionType.FETCH_SONGS:
      return action.payload;
    case SongActionType.ADD_SONG:
      return [...state, action.payload];
    case SongActionType.REMOVE_SONG:
      return state.filter((song) => song['@key'] !== action.payload);
    case SongActionType.UPDATE_SONG:
      return state.map((song) =>
        song['@key'] === action.payload['@key'] ? { ...song, ...action.payload } : song
      );
    default:
      return state;
  }
};
