export enum TMDMediaType {
  Movie = 'movie',
  Tv = 'tv',
}

export interface TMDBTrending {
  adult: boolean;
  backdropPath: string;
  id: number;
  title?: string;
  originalLanguage: string;
  originalTitle?: string;
  overview: string;
  posterPath: string;
  mediaType: TMDMediaType;
  genreIDS: number[];
  popularity: number;
  releaseDate?: Date;
  video?: boolean;
  voteAverage: number;
  voteCount: number;
  name?: string;
  originalName?: string;
  firstAirDate?: string;
  originCountry?: string[];
}
