import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-health-card',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './health-card.component.html',
  styleUrl: './health-card.component.css'
})
export class HealthCardComponent {
  @Input() title!: string;
  @Input() icon: string = '';
  @Input() value!: string;
  @Input() subtitle!: string;
  @Input() progress!: number;
  @Input() progressColor!: string;
  @Input() chartColor!: string;
  @Input() chartPoints!: string;
  @Input() wrapperClass: string = '';
}
