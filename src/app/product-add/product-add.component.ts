import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { state, style, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router'; // Importa el tipo Router
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers:[ UploadService ],
  animations: [
    trigger('done', [
      state('void', style({})),
      state('done', style({})),
    ])],
})
export class ProductAddComponent implements OnInit{

  formProduct!: FormGroup;
  files: File[] = []; //cloudinary
  
  constructor( 
    private route: ActivatedRoute,
    private routerService: Router, // Cambiar el nombre de la variable a 'routerService'
    private formBuilder : FormBuilder,
    private _apiService : ApiService,
    private _snackBar: MatSnackBar,
    private _upLoadService: UploadService,
    private _userService: UserService
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
     
  const avatar = this._userService.getAvatarFromLocalStorage();

  if (!avatar) {
    // Si no hay avatar en el localStorage, redirige a /login
    this.routerService.navigate(['/login']);
  }
        
      

      this.formProduct.get('images')?.valueChanges.subscribe((value) => {
        if (value && value.length > 0) {
          
          console.log(this.formProduct.valueChanges)
        }
      });
    }
    
    
    showMessageAndRedirect(message: string): void {
      this._snackBar.open(message, 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        // Redirigir a la ruta /products después de mostrar el mensaje
        this.routerService.navigate(['/products']); // Utilizar 'routerService'
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
          this.files = [];  
          this.showMessageAndRedirect('Product create successfully');
          
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }

  //cloudinary
  

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
  
   this._upLoadService.upLoadImage(data).subscribe((response) => {
    if (response && response.secure_url) {
      console.log(response.secure_url);

      // Establecer el valor de 'images' en el formulario
      this.formProduct.get('images')?.setValue(response.secure_url);
    }
   })
  }
}
