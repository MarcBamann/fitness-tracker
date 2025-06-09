import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Output() colorChange = new EventEmitter<string>();

  changeColor(color: string) {
    this.colorChange.emit(color);
  }
}
