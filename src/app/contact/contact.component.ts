import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  
  formContact: FormGroup;
  userActive: string = 'Delia R Gonzalez B';

  constructor( private form: FormBuilder) {
    this.formContact = this.form.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  })
  }


ngOnInit(): void {
  this.formContact.valueChanges.subscribe((valor) => { 
    console.log(valor)
   })
}

 enviar(){console.log(this.formContact.value)}
 hasErrors( controlName: string, errorType: string){
  return this.formContact.get(controlName)?.hasError(errorType) &&
          this.formContact.get(controlName)?.touched
 }
}
