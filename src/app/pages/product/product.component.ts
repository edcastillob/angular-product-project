import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { IProduct } from '../../models/product.model';

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

  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: IProduct[]) => {       
      this.productList = data
      
      
      })
  }
}
