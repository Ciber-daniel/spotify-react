export interface SpotifySearchResponse {
  href: string;
  items: any[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

export interface Items {
  album: any | {};
  artists: any | {};
  available_markets: string[];
  artist: string;
  releaseDate: string;
  release_date: string;
  imageUrl: string;
  externalUrl: string;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: string;
  external_urls: string;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
