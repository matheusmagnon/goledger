
export type PlaylistType = {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
  name: string;
  private: boolean;
  songs?: {
      '@assetType'?: string;
      '@key': string;
      name?: string;
    }[];
};

export type CreatePlaylistType = {
  name: string;
  isPrivate: boolean;
  songs?: {
    '@key': string;
  }[];
};

export type UpdatePlaylistType = {
  '@key': string;
  isPrivate?: boolean;
  songs?: {
    '@key': string;
  }[];
};