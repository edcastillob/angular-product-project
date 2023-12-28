import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'landing-page-angular';
 
  constructor(private _userService: UserService, private _route: Router) {}
  getAvatarFromLocalStorage(): string {    
    return this._userService.getAvatarFromLocalStorage();
  }

  getFullNameFromLocalStorage(): string {
    return this._userService.getFullNameFromLocalStorage();

    }
    logOut(): void {
     
      localStorage.removeItem('token');
      localStorage.removeItem('avatar'); 
      localStorage.removeItem('fullname'); 
      this._route.navigate(['/products'])
    }
}
