import { Routes } from '@angular/router';
import {HomeComponent} from './layout/main/home/home.component';
import {MyGoalsComponent} from './layout/main/my-goals/my-goals.component';
import {HealthComponent} from './layout/main/health/health.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-goals', component: MyGoalsComponent },
  { path: 'health', component: HealthComponent },
];
