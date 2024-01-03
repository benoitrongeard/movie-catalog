export interface TmdbConfiguration {
  images: ImagesConfiguration;
  changeKeys: string[];
}

export interface ImagesConfiguration {
  baseUrl: string;
  secureBaseUrl: string;
  backdropSizes: BackdropSizes[];
  logoSizes: LogoSizes[];
  posterSizes: PosterSizes[];
  profileSizes: ProfileSizes[];
  stillSizes: StillSizes[];
}

export enum StillSizes {
  w92 = 'w92',
  w185 = 'w185',
  w300 = 'w300',
  original = 'original',
}

export enum ProfileSizes {
  w45 = 'w45',
  w185 = 'w185',
  h632 = 'h632',
  original = 'original',
}

export enum PosterSizes {
  w92 = 'w92',
  w154 = 'w154',
  w185 = 'w185',
  w342 = 'w342',
  w500 = 'w500',
  w780 = 'w780',
  original = 'original',
}

export enum BackdropSizes {
  w300 = 'w300',
  w780 = 'w780',
  w1280 = 'w1280',
  original = 'original',
}

export enum LogoSizes {
  w45 = 'w45',
  w92 = 'w92',
  w154 = 'w154',
  w185 = 'w185',
  w300 = 'w300',
  w500 = 'w500',
  original = 'original',
}
