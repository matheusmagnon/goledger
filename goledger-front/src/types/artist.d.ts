export type Artist = {
    "@assetType": string;
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string;
    country: string;
    name: string;
    albums?: {
      "@key": string;
      name: string;
      year: string;
    }[] | null;
  };
  
  export type UpdateArtistType = {
    "@key": string;
    name?: string;
    country?: string;
  };
  