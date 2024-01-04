import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthServiceService } from './services/oauth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'landing-page-angular';
  avatar: string ="";
  fullName: string ="";
 
  constructor(
    private _userService: UserService, 
    private _route: Router, 
    private route: ActivatedRoute,
    private _oauthService: OAuthServiceService,  
    ) {}
   
    

  

  getAvatarFromLocalStorage(): string {    
    return this._userService.getAvatarFromLocalStorage();
  }

  getFullNameFromLocalStorage(): string {
    return this._userService.getFullNameFromLocalStorage(); 
   }

  getGoogleAvatar(): string {    
    return this._userService.getAvatarFromLocalStorage();
  }

  getGoogleFullName(): string {
    return this._userService.getFullNameFromLocalStorage(); 
   }


    logOut(): void {
      this._oauthService.logOutGoogle()
      localStorage.removeItem('token');
      localStorage.removeItem('avatar'); 
      localStorage.removeItem('fullname'); 
      localStorage.removeItem('username'); 
      localStorage.removeItem('cart')
      this._route.navigate(['/products'])
    }
}
