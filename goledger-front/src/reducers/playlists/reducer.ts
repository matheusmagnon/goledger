import { PlaylistAction, PlaylistActionType } from "./actions";
import { PlaylistType } from "./types";

type PlaylistsState = PlaylistType[];

export const playlistsReducer = (state: PlaylistsState, action: PlaylistAction): PlaylistsState => {
  switch (action.type) {
    case PlaylistActionType.FETCH_PLAYLIST:
      return action.payload;
    case PlaylistActionType.ADD_PLAYLIST:
      return [...state, action.payload];
    case PlaylistActionType.REMOVE_PLAYLIST:
      return state.filter((song) => song['@key'] !== action.payload);
    case PlaylistActionType.UPDATE_PLAYLIST:
      return state.map((playlist) =>
        playlist['@key'] === action.payload['@key'] ? { ...playlist, ...action.payload } : playlist
      );
    default:
      return state;
  }
};
