import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { ApiService } from '../../../services/api.services';
import { error } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ ReactiveFormsModule,NgClass],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  formProduct!: FormGroup;

  constructor( 
    private formBuilder : FormBuilder,
    private _apiService : ApiService
    ){
    this.formProduct = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
      images: [''],
      category: ['', [Validators.required]],
    })
  }

  enviar(event: Event){
    event.preventDefault();    
    this._apiService.newProduct(this.formProduct.value)    
  }
  
  hasError(field: string, typeError: string){
    return this.formProduct.get(field)?.hasError(typeError) &&
      this.formProduct.get(field)?.touched;
    }
  ngOnInit(): void {
    
  }
}
