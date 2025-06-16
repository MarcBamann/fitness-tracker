import { Component } from '@angular/core';
import {HealthCardComponent} from '../../../components/health-card/health-card.component';

@Component({
  selector: 'app-health',
  imports: [
    HealthCardComponent
  ],
  templateUrl: './health.component.html',
  styleUrl: './health.component.css'
})
export class HealthComponent {

}
