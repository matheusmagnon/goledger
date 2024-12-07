import { AlbumAction, AlbumActionType } from "./actions";
import { Album } from "./types";

type AlbumState = Album[];


// Reducer para gerenciar albums
export const albumsReducer = (state: AlbumState, action: AlbumAction): AlbumState => {
  switch (action.type) {
    case AlbumActionType.FETCH_ALBUMS:
      return action.payload;
    case AlbumActionType.ADD_ALBUM:
      return [...state, action.payload];
    case AlbumActionType.REMOVE_ALBUM:
      return state.filter((album) => album['@key'] !== action.payload);
    case AlbumActionType.UPDATE_ALBUM:
      return state.map((album) =>
        album['@key'] === action.payload['@key'] ? { ...album, ...action.payload } : album
      );
    default:
      return state;
  }
};
