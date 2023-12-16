import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  loading: boolean = true;

  private _navigate= inject(Router)
  private _route = inject(ActivatedRoute)
  private _apiService = inject(ApiService)

  public product?: IProduct;


  ngOnInit(): void {
    this._route.params.subscribe((params) => { 
      this._apiService.getProductById(params['id']).subscribe((data: IProduct) => { 
        this.product= data;
        this.loading= false
       })
     })
  }
navigate(){
  this._navigate.navigate(['/product']);

}
}
