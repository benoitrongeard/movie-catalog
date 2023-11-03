export interface TmdbConfiguration {
  images: ImagesConfiguration;
  changeKeys: string[];
}

export interface ImagesConfiguration {
  baseUrl: string;
  secureBaseUrl: string;
  backdropSizes: backdropSizes[];
  logoSizes: logoSizes[];
  posterSizes: posterSizes[];
  profileSizes: profileSizes[];
  stillSizes: stillSizes[];
}

export type stillSizes = 'w92' | 'w185' | 'w300' | 'original';

export type profileSizes = 'w45' | 'w185' | 'h632' | 'original';

export type posterSizes =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

export type backdropSizes = 'w300' | 'w780' | 'w1280' | 'original';

export type logoSizes =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w500'
  | 'original';
