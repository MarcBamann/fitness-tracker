import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {GoalEditDialogComponent} from '../../../components/goal-edit-dialog/goal-edit-dialog.component';
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
    const progress = goal.currentValue || 0;
    const target = goal.targetValue || 1;
    return Math.min(Math.round((progress / target) * 100), 100);
  }

  saveGoal(updatedGoal: Goal) {
    const index = this.goals.findIndex(g => g.id === updatedGoal.id);
    if (index > -1) {
      this.goals[index] = updatedGoal;
      localStorage.setItem('myGoals', JSON.stringify(this.goals));
    }
  }

  getMotivationalText(goal: Goal): string {
    const progress = this.calculateProgress(goal);

    if (progress === 0) return 'Los du faule Sau!';
    if (progress < 25) return 'Da ist meine Oma ja schneller!';
    if (progress < 50) return 'Wie faul bist du eigentlich?';
    if (progress < 75) return 'Das geht aber viel besser';
    if (progress < 100) return 'Jetzt mach mal hinne';
    return 'Ziel erreicht - Nächstes mal schneller!';
  }
}
