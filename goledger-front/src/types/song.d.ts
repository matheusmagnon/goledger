export type SongType = {
    '@assetType': string;
    '@key': string;
    '@lastTouchBy': string;
    '@lastTx': string;
    '@lastUpdated': string;
    album: {
      '@assetType'?: string;
      '@key': string;
      name?: string;
    }
    name: string;
  };
  
  
  export type UpdateSongType = {
    '@key': string;
    album: {
      '@key': string;
    }
    year: string;
  };