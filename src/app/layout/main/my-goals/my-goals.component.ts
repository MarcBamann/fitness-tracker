import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {GoalEditDialogComponent} from '../../../goal-edit-dialog/goal-edit-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

export interface Goal {
  id: string;
  title: string;
  icon: string;
  targetValue: number;
  dailyProgress?: {
    [date: string]: number;
  };
  unit: string;
  deadline: Date;
  currentValue?: number;
}

@Component({
  selector: 'app-my-goals',
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './my-goals.component.html',
  styleUrl: './my-goals.component.css'
})
export class MyGoalsComponent implements OnInit {
  goals: Goal[] = [];

  defaultGoals: Goal[] = [
    {
      id: 'steps',
      title: 'Schritte',
      icon: 'directions_walk',
      targetValue: 10000,
      dailyProgress: {},
      unit: 'Schritte',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
    {
      id: 'jogging',
      title: 'Joggen',
      icon: 'directions_run',
      targetValue: 5,
      dailyProgress: {},
      unit: 'km',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
    {
      id: 'cycling',
      title: 'Radfahren',
      icon: 'directions_bike',
      targetValue: 20,
      dailyProgress: {},
      unit: 'km',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
    {
      id: 'activeMinutes',
      title: 'Aktivitätsminuten',
      icon: 'access_time',
      targetValue: 150,
      dailyProgress: {},
      unit: 'Minuten',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const savedGoals = localStorage.getItem('myGoals');
    if (savedGoals) {
      this.goals = JSON.parse(savedGoals);
    } else {
      this.goals = [...this.defaultGoals];
      localStorage.setItem('myGoals', JSON.stringify(this.goals));
    }
  }

  openEditDialog(goal: Goal) {
    const dialogRef = this.dialog.open(GoalEditDialogComponent, {
      width: '400px',
      data: { goal: { ...goal } },
    });

    dialogRef.afterClosed().subscribe((result: Goal | undefined) => {
      if (result) {
        this.saveGoal(result);
      }
    });
  }

  calculateProgress(goal: Goal): number {
    const done = goal.currentValue ?? 0;  // Aktueller Wert, den du eingibst
    const total = goal.targetValue;

    return total > 0 ? Math.min(Math.round((done / total) * 100), 100) : 0;
  }

  saveGoal(updatedGoal: Goal) {
    const index = this.goals.findIndex(g => g.id === updatedGoal.id);
    if (index > -1) {
      this.goals[index] = updatedGoal;
      localStorage.setItem('myGoals', JSON.stringify(this.goals));
    }
  }

  calculateCurrentValue(goal: Goal): number {
    if (goal.dailyProgress) {
      return Object.values(goal.dailyProgress).reduce((sum, val) => sum + val, 0);
    }
    return goal.currentValue ?? 0;
  }

  getMotivationalText(goal: Goal): string {
    const progress = this.calculateProgress(goal);
    if (progress >= 100) return '✅ Ziel erreicht! Super!';
    if (progress >= 75) return '💪 Fast am Ziel, dranbleiben!';
    if (progress >= 40) return '👍 Guter Start!';
    return '🏃‍♂️ Los geht’s!';
  }

  getStatusClass(goal: Goal): string {
    const progress = this.calculateProgress(goal);
    if (progress >= 100) return 'completed';
    if (progress >= 40) return 'on-track';
    return 'behind';
  }

  getStatusText(goal: Goal): string {
    const progress = this.calculateProgress(goal);
    if (progress >= 100) return '✅ Ziel erreicht!';
    if (progress >= 75) return '👍 Fast geschafft!';
    if (progress >= 40) return '🟢 Dranbleiben!';
    return '🔴 Los geht\'s!';
  }

}
