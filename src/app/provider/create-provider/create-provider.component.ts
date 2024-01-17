import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProviderService } from '../../services/provider.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { state, style, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router'; // Importa el tipo Router

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent {
  formProvider!: FormGroup;

  constructor(
    private _providerService: ProviderService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private routerService: Router, 
  ){
    this.formProvider = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      rif: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],    
    })
  }


  enviar(){
    if (this.formProvider.valid) {
      const dataProvider = this.formProvider.value;
      console.log(dataProvider)

      this._providerService.newProvider(dataProvider).subscribe(
        (response) => {
          console.log('Provider añadido con éxito:', response);          
          this.formProvider.reset();            
          this.showMessageAndRedirect('provider create successfully');          
        },
        (error) => {
          console.error('Error al agregar el provider:', error);         
        }
      );
    }
  }
  showMessageAndRedirect(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
    }).afterDismissed().subscribe(() => {
      this.routerService.navigate(['/providers']);
    });
  }

  hasError( controlName: string, errorType: string){
    return this.formProvider.get(controlName)?.hasError(errorType) &&
            this.formProvider.get(controlName)?.touched
   }

}
