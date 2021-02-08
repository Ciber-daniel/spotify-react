export interface SpotifySearchResponse {
  href: string;
  items: any[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}
