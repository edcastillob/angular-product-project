import { Component } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { ApiService } from '../../../services/api.services';
import { error } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ ReactiveFormsModule,],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup;
  product: IProduct ={
    id:0,
    name: "",
    description: "",
    price: 0,
    images: [""],
    category: "",
    isActive:true
  }  
  

  constructor(
    private _apiService: ApiService,
    private fb: FormBuilder
    ) {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        price: [0, Validators.min(0)],
        category: ['', Validators.required],
      });
    }
  newProduct(){
    this._apiService.newProduct(this.product).subscribe((res) => { 
      console.log(res)
     }, 
    (error) => { console.log(error) }
     )
  }

}
