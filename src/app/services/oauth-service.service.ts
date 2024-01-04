import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OAuthService, AuthConfig, OAuthEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, defer, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthServiceService 
{
  private baseURL = "http://localhost:3001/user/login-google";

  constructor(
    private oauthService: OAuthService,
    private _httpClient: HttpClient,
  ) { this.initLogin()}



  initLogin(){
    const config: AuthConfig ={
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '698347701411-il4kdor9343p809tcjh68m43eumcogep.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/products',
      scope: 'openid profile email',
    }
      this.oauthService.configure(config);
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.loadDiscoveryDocumentAndTryLogin()    
 


  }
  loginGoogle(): void {
    // Iniciar el flujo de autenticación
    this.oauthService.initImplicitFlow();

  }

  logOutGoogle() {
    this.oauthService.logOut()      
    }

    getProfile(){
      return this.oauthService.getIdentityClaims()
    }

    loginUserGoogle(user: any): Observable<any>{     

        return this._httpClient.post<any>(this.baseURL, user)
      }
}


