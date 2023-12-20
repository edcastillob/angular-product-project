import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { state, style, trigger } from '@angular/animations';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  animations: [
    trigger('done', [
      state('void', style({})),
      state('done', style({})),
    ])],
})
export class ProductAddComponent implements OnInit{

  formProduct!: FormGroup;
  
  constructor( 
    private formBuilder : FormBuilder,
    private _apiService : ApiService,
    private _snackBar: MatSnackBar
    ){
    this.formProduct = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
      images: [''],
      category: ['', [Validators.required]],
    })
  }

  
  
  ngOnInit(): void {
    //   this.formProduct.valueChanges.subscribe((valor) => { 
      //   console.log(valor)
      //  })
    }
    
    
    showMessage(message: string) {
      this._snackBar.open(message, 'Cerrar', {
        duration: 3000, // Duración en milisegundos
      });
    }

  hasError( controlName: string, errorType: string){
   return this.formProduct.get(controlName)?.hasError(errorType) &&
           this.formProduct.get(controlName)?.touched
  }
  
  enviar(){
    
    if (this.formProduct.valid) {
      const productData = this.formProduct.value;

      // Llamada al servicio para agregar un nuevo producto
      this._apiService.newProduct(productData).subscribe(
        (response) => {
          console.log('Producto añadido con éxito:', response);
          // Puedes agregar cualquier lógica adicional después de agregar el producto
          this.formProduct.reset();
          this.showMessage('Product created successfully');
          
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }
}
