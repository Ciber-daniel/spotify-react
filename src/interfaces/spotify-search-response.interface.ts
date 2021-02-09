export interface SpotifySearchResponse {
  href: string;
  items: any[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

export interface Artist {
  id: string;
  name: string;
  type: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  id: string;
  images: string[];
  name: string;
  total_tracks: number;
  external_urls: string;
}

export interface Track {
  album: any | Album;
  artists: any | Artist[];
  available_markets: string[];
  artist: string;
  releaseDate: string;
  release_date: string;
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
