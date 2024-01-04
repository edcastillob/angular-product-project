import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';
import { ConfirmationDialogComponentComponent } from '../confirmation/confirmation-dialog-component/confirmation-dialog-component.component';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { OAuthServiceService } from '../services/oauth-service.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productsList: IProduct[] = [];
  searchQuery: string = '';
  categories: string[] = [];
  selectedCategory: string = 'All';
  user: string ="";

  constructor( 
    private _apiService: ApiService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
    private _routerService: Router,
    public dialog: MatDialog,
    private _userService: UserService,
    private authGoogle: OAuthServiceService,
    private routerService: Router,
    ){}

ngOnInit(): void {    
    this._apiService.getAllProducts().subscribe((data: IProduct[]) => { 
      this.productsList = data
      this.extractCategories()      
     })

     this.dataGoogle()
}

showMessageAndRedirect(message: string): void {
  this._snackBar.open(message, 'Cerrar', {
    duration: 3000,
  })
}

openDeleteConfirmationDialog(id: string): void {
  // const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);
  const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
    data: { message: '¿Are you sure to delete this product?' },
  });

  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      // El usuario hizo clic en "Aceptar", realiza la acción de eliminación aquí
      this.deleteProduct(id);
    } else {
      // El usuario hizo clic en "Cancelar" o cerró el diálogo, no hagas nada
    }
  });
}

deleteProduct(id: string): void {
  // Lógica de eliminación aquí
  this._apiService.deleteProduct(id).subscribe(() => {
    // Vuelve a cargar la lista de productos después de la eliminación
    this._apiService.getAllProducts().subscribe((data: IProduct[]) => {
      this.productsList = data;
    });
  });
}
searchProducts(): IProduct[] {
  if (!this.searchQuery) {
    return this.productsList; // No hay consulta de búsqueda, devuelve la lista completa
  }

  // Filtra los productos basándose en la búsqueda (no case-sensitive)
  return this.productsList.filter(product =>
    product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

extractCategories(): void {
  // Extrae las categorías únicas de la lista de productos
  this.categories = Array.from(new Set(this.productsList.map(product => product.category)));
  this.categories.unshift('All'); // Agrega la opción 'All' al principio
}
filterProductsByCategory(): IProduct[] {
  if (this.selectedCategory === 'All') {
    return this.productsList; // Mostrar todos los productos si la categoría seleccionada es 'All'
  } else {
    return this.productsList.filter(product => product.category === this.selectedCategory);
  }
}

getFilteredProducts(): IProduct[] {
  let filteredProducts = this.productsList;

  // Apply category filter
  if (this.selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
  }

  // Apply search filter
  if (this.searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  return filteredProducts;
}

addToCart(product: IProduct): void {
  this.user= this._userService.getUser();
  console.log(this.user)
  if(!this.user){
    this.showMessageAndRedirect('¡To buy you must be logged in!');
    this._routerService.navigate(['/login'])
  }else{
    this._cartService.addToCart(product);
    this.showMessageAndRedirect(`${product.name} has been successfully added to your cart`);
  }

}


dataGoogle(){
 
  const user = (this.authGoogle.getProfile());  
  this.authGoogle.loginUserGoogle(user).subscribe(
    (response: any) => {  
      localStorage.setItem('token', response.token);
      localStorage.setItem('avatar', response.user.image[0]);
      localStorage.setItem('fullname', response.user.fullname);      
  },(error) => { 
    console.log('Error: ',error) 
      
    // this.showMessageError('invalid username or password');
  
    }
  )
}



}