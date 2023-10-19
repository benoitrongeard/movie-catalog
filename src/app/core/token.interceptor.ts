import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private configService: ConfigurationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestUpdated = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.configService.getTMDBApiToken()}`,
      },
    });
    return next.handle(requestUpdated);
  }
}
