import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-component',
  styleUrls: ['./confirmation-dialog-component.component.css'],
  template: `  
  <div mat-dialog-title><h3>Confirmation...</h3></div>
  <div class="divAlert"><img class="alert" src="../../assets/alert.png" alt="Alert"></div> 
  <!-- <div mat-dialog-content class="text-center"><h4>¿Are you sure to delete this record?</h4></div>   -->
  <div mat-dialog-content class="text-center"><h4>{{ data.message }}</h4></div>  
  <div mat-dialog-actions class="d-flex justify-content-end">
    <button class="btn btn-secondary" mat-button (click)="onNoClick()">No</button>
    <button class="btn btn-secondary" mat-button (click)="onYesClick()">Yes</button>
  </div> 
`,
})
export class ConfirmationDialogComponentComponent {
  @Input() message: string = 'Are you sure?';

  // constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>) {}
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
