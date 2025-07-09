import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle, MatDialogClose
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HealthStorageService} from '../../services/health-storage.service';

export interface HealthDialogData {
  category: string;
  value: number;
  date: Date; // NEU: Datum
}

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
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogTitle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogClose,
  ],
  styleUrls: ['./health-value-dialog.component.css']
})
export class HealthValueDialogComponent {
  value: number | null = null;
  date: Date;

  constructor(
    public dialogRef: MatDialogRef<HealthValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: string, value: number, date: Date },
    private storage: HealthStorageService
  ) {
    this.date = new Date(data.date);
    this.value = data.value;
  }

  onDateChange(newDate: Date) {
    this.date = newDate;
    this.value = this.storage.getValue(this.data.category, newDate) ?? null;
  }

  save() {
    this.dialogRef.close({
      category: this.data.category,
      value: this.value,
      date: this.date,
    });
  }
}
