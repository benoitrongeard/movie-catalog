import { FirebaseConfiguration } from './firebase-configuration.interface';

export interface AppConfiguration {
  production: boolean;
  tmdbApiUrl: string;
  tmdbApiToken: string;
  vercelProxyUrl: string;
  firebase: FirebaseConfiguration;
}
