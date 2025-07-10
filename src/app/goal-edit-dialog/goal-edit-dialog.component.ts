import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Goal } from 'C:/Users/marcb/WebstormProjects/fitness-tracker/src/app/layout/main/my-goals/my-goals.component';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-goal-edit-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatFormField,
    MatDialogActions,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatButton,
    MatDialogTitle,
    MatDatepickerInput,
    MatNativeDateModule
  ],
  templateUrl: './goal-edit-dialog.component.html',
  styleUrl: './goal-edit-dialog.component.css'
})
export class GoalEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GoalEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goal: Goal }
  ) {}

  save(): void {
    this.dialogRef.close(this.data.goal);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
