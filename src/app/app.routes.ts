import { Routes } from '@angular/router';
import {MyGoalsComponent} from './layout/main/my-goals/my-goals.component';
import {HealthComponent} from './layout/main/health/health.component';
import {DatenschutzComponent} from './layout/main/datenschutz/datenschutz.component';
import {ImpressumComponent} from './layout/main/impressum/impressum.component';

export const routes: Routes = [
 /* { path: '', redirectTo: 'home', pathMatch: 'full' }, */
  { path: '', redirectTo: 'my-goals', pathMatch: 'full' },
  { path: 'my-goals', component: MyGoalsComponent },
  { path: 'health', component: HealthComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '**', redirectTo: 'my-goals' }
 /* { path: '**', redirectTo: 'home' }*/
];
