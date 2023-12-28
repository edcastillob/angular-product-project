import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router'; // Importa el tipo Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup;
  files: File[] = []; //cloudinary

  constructor( 
    private _uploadService: UploadService, 
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private routerService: Router, // Cambiar el nombre de la variable a 'routerService'

    ){

    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.passwordValidator
      ]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl(''),
    })
    
  }
    // Definir el validador personalizado para la contraseña
// ...

private passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return regex.test(control.value) ? null : { invalidPassword: true };
};

// ...

    
  hasError( controlName: string, errorType: string){
    return this.formRegister.get(controlName)?.hasError(errorType) &&
            this.formRegister.get(controlName)?.touched
   }

  
  enviar(){
    if (this.formRegister.valid) {
      const userData = this.formRegister.value;
      console.log(userData)
   // Llamada al servicio para agregar un nuevo producto
   this._userService.postUser(userData).subscribe(
    (response) => {
      console.log('Usuario Registrado:', response);
      // Puedes agregar cualquier lógica adicional después de agregar el producto
      this.formRegister.reset();      
      this.files = [];  
      this.showMessageAndRedirect('user create successfully');
      
    },
    (error) => {
      console.error('Error registrando user:', error);
      // Maneja el error según tus necesidades
    }
  );
}
}
showMessageAndRedirect(message: string): void {
  this._snackBar.open(message, 'Cerrar', {
    duration: 3000,
  }).afterDismissed().subscribe(() => {
    // Redirigir a la ruta /products después de mostrar el mensaje
    this.routerService.navigate(['/login']); // Utilizar 'routerService'
  });
}


  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.onUpLoad()
  }
  
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  onUpLoad() {
  
    if (!this.files || this.files.length === 0) {
      throw new Error('No ha cargado imagen');
    }
  
    //upload img a cloudinary
   const file_data = this.files[0];
   const data= new FormData();
   data.append('file', file_data);
   data.append('upload_preset', 'images')// preset en cloudinary
   data.append('cloud_name','prodelevatepf')
  
   this._uploadService.upLoadImage(data).subscribe((response) => {
    if (response && response.secure_url) {
      console.log(response.secure_url);

      // Establecer el valor de 'images' en el formulario
      this.formRegister.get('image')?.setValue([response.secure_url]);
    }
   })
  }
}
