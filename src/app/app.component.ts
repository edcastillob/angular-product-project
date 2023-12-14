import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[HttpClient, ReactiveFormsModule]
})
export class AppComponent {
  title = 'Edcastillob- Angular 17';

  menuOption: string = ''; // Opcion para activar la opción Nav

  onOption(menuOption: string){ 
    this.menuOption = menuOption
  }


}
