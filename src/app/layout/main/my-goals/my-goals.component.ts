import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-my-goals',
  imports: [
    NgForOf
  ],
  templateUrl: './my-goals.component.html',
  styleUrl: './my-goals.component.css'
})
export class MyGoalsComponent {
  goals = [
    { title: 'Steps', current: 4200, target: 10000, unit: 'steps' },
    { title: 'Cycling', current: 12, target: 30, unit: 'km' },
    { title: 'Running', current: 5, target: 10, unit: 'km' },
    { title: 'Workout Time', current: 25, target: 60, unit: 'min' },
  ];

  editGoal(goal: any) {
    alert(`Edit feature for ${goal.title} coming soon!`);
  }
}
