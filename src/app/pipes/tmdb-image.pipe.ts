import { Pipe, PipeTransform, inject } from '@angular/core';
import { TmdbConfigurationService } from '../services/tmdb/tmdb-configuration.service';
import { PosterSizes } from '../interfaces/tmdb-configuration.interface';

@Pipe({
  name: 'TMDBImage',
  standalone: true,
})
export class TMDBImagePipe implements PipeTransform {
  tmdbConfigurationService = inject(TmdbConfigurationService);
  imageConfiguration = this.tmdbConfigurationService.getImageConfiguration();

  transform(id: string, size: PosterSizes): unknown {
    const url = this.imageConfiguration.baseUrl + size + id;
    return url;
  }
}
