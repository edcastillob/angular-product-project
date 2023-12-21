import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';
import { ConfirmationDialogComponentComponent } from '../confirmation/confirmation-dialog-component/confirmation-dialog-component.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productsList: IProduct[] = [];


  constructor( 
    private _apiService: ApiService,
    public dialog: MatDialog){}

ngOnInit(): void {    
    this._apiService.getAllProducts().subscribe((data: IProduct[]) => { 
      this.productsList = data
      
      
     })
}

openDeleteConfirmationDialog(id: string): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);

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
}