import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularOauth2OidcComponent } from './angular-oauth2-oidc.component';

describe('AngularOauth2OidcComponent', () => {
  let component: AngularOauth2OidcComponent;
  let fixture: ComponentFixture<AngularOauth2OidcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularOauth2OidcComponent]
    });
    fixture = TestBed.createComponent(AngularOauth2OidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
