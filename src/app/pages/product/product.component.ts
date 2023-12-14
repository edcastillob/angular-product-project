import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productList: IProduct[] = [];
  private _apiService = inject(ApiService)
  private _router = inject(Router)

  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: IProduct[]) => {       
      this.productList = data        
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      })
  }

  navigate(id: number){ 
    this._router.navigate(['/products', id])
  }
}
