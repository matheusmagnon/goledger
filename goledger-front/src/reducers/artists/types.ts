export type Artist = {
    '@assetType': string;
    '@key': string;
    '@lastTouchBy': string;
    '@lastTx': string;
    '@lastUpdated': string;
    country: string;
    name: string;
  };

  export type UpdateArtistType = {
    '@key': string;
    name?: string;
    country?: string;
  };