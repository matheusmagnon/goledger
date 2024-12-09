export type Album = {
    '@assetType': string;
    '@key': string;
    '@lastTouchBy': string;
    '@lastTx': string;
    '@lastUpdated': string;
    artist: {
      '@assetType': string;
      '@key': string;
    }
    year: string;
    name: string;
  };
  
  export type UpdateAlbumType = {
    '@key': string;
    year: string;
  };