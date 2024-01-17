import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProvider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit{
  providerId: string | null = null;
  provider!: IProvider;
  constructor(
    private route: ActivatedRoute,
    private routerService: Router, 
    private _providerService: ProviderService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.providerId = this.route.snapshot.paramMap.get('id');
  
    if (this.providerId) {
      this._providerService.getProviderById(this.providerId).subscribe(
        (data: IProvider) => {
          this.provider = data;          
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  showMessageAndRedirect(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
    }).afterDismissed().subscribe(() => {      
      this.routerService.navigate(['/providers']); 
    });
  }

  updateProvider(): void {
    if (this.providerId !== null && this.provider) {
      this._providerService.updateProvider(this.providerId, this.provider).subscribe(
        (data: IProvider) => {
          this.showMessageAndRedirect('Provider updated successfully');
        },
        error => {
          console.log('Error updating provider:', error);
        }
      );
    } else {
      console.log(`Invalid  ${this.providerId} or provider data.`);
    }
  }
}
