import { Component, OnInit } from '@angular/core';
import { IProvider } from '../models/provider.model';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  providerList: IProvider[] = [];

  constructor(
    private _providerService: ProviderService,
  ){}


  ngOnInit(): void {
    this._providerService.getAllProvider().subscribe((data: IProvider[]) => { 
      this.providerList = data
      console.log(data)    
     })
  }
}
