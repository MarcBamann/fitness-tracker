import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-health-value-dialog',
  templateUrl: './health-value-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatFormField,
    FormsModule
  ],
  styleUrls: ['./health-value-dialog.component.css']
})
export class HealthValueDialogComponent {
  value: string = '';

  constructor(
    public dialogRef: MatDialogRef<HealthValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: string }
  ) {}

  save() {
    this.dialogRef.close(this.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
