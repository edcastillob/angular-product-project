import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OAuthServiceService } from '../services/oauth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  

  constructor( 
    private _userService: UserService,
    private _snackBar: MatSnackBar, 
    private routerService: Router,
    private oauthService: OAuthServiceService){

  this.formLogin = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(5)]),    
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      this.passwordValidator
    ]),
    
  })
}

private passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return regex.test(control.value) ? null : { invalidPassword: true };
};
  enviar(){
    if (this.formLogin.valid) {
      const user = this.formLogin.value;
      // console.log(user)

      this._userService.loginUser(user).subscribe(
        (response: any) => {  // Cambiado de IUserLogin a IResponseLogin
          this.formLogin.reset();     
          console.log(response.user);          
          localStorage.setItem('token', response.token);
          localStorage.setItem('avatar', response.user.image[0]);
          localStorage.setItem('fullname', response.user.fullname);
          localStorage.setItem('username', response.user.username);
          this.showMessageAndRedirect('Login successfully');
        },(error) => { 
          console.log('Error: ',error) 
          this.formLogin.reset();     
          this.showMessageError('invalid username or password');
        })
  }
}


loginGoogle() {
  this.oauthService.loginGoogle();
}




showMessageAndRedirect(message: string): void {
  this._snackBar.open(message, 'Cerrar', {
    duration: 2000,
  }).afterDismissed().subscribe(() => {    
    this.routerService.navigate(['/products']); 
  });
}
showMessageError(message: string): void {
  this._snackBar.open(message, 'Cerrar', {
    duration: 2000,
  })
}
  hasError( controlName: string, errorType: string){
    return this.formLogin.get(controlName)?.hasError(errorType) &&
            this.formLogin.get(controlName)?.touched
   }
}
