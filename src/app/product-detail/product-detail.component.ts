import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsList, Product } from '../products/products.mock';
import { ApiService } from '../services/api.service';
import { IProduct } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  product?: IProduct;
  productsList: IProduct[] = [];
  loading: boolean = true;
  
  constructor( 
    private _route: ActivatedRoute,
    private _apiService: ApiService
    ){}

    ngOnInit(): void {
      
      this._route.params.subscribe(params => { 
        this._apiService.getProductById((params['productId'])).subscribe((data: IProduct) => { 
          this.product = data;
        })
        this.loading = false
      })      
      
    }
    handleImageError(event: any) {     
     event.target.src = '../../assets/noimage.jpeg';
   }
}
