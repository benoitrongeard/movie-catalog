export interface TmdbConfiguration {
  images: ImagesConfiguration;
  changeKeys: string[];
}

export interface ImagesConfiguration {
  baseURL: string;
  secureBaseURL: string;
  backdropSizes: ['w300' | 'w780' | 'w1280' | 'original'];
  logoSizes: ['w300' | 'w780' | 'w1280' | 'original'];
  posterSizes: [
    'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original',
  ];
  profileSizes: ['w45' | 'w185' | 'h632' | 'original'];
  stillSizes: ['w92' | 'w185' | 'w300' | 'original'];
}
