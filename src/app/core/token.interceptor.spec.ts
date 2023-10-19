import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { ConfigurationService } from '../services/configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TokenInterceptor, ConfigurationService],
      imports: [HttpClientTestingModule],
    })
  );

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
