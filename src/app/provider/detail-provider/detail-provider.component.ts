
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProvider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.component.html',
  styleUrls: ['./detail-provider.component.css']
})
export class DetailProviderComponent implements OnInit{
  provider?: IProvider;
  providerId: string = "";

  constructor(
    private _route: ActivatedRoute,
    private _providerService: ProviderService,
  ){}


  ngOnInit(): void {
    this._route.params.subscribe(params => { 
      this.providerId = params['providerId']
      this._providerService.getProviderById(params['providerId']).subscribe((data: IProvider) => { 
        this.provider = data;
        console.log(this.providerId)
        console.log("data", data)
      });
    })
}
}
