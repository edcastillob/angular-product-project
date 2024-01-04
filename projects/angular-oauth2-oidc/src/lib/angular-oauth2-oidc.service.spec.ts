import { TestBed } from '@angular/core/testing';

import { AngularOauth2OidcService } from './angular-oauth2-oidc.service';

describe('AngularOauth2OidcService', () => {
  let service: AngularOauth2OidcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularOauth2OidcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
