import {Component, EventEmitter, Output} from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {UserComponent} from './user/user.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    NavComponent,
    UserComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() colorChange = new EventEmitter<string>();

  forwardColorChange(color: string) {
    this.colorChange.emit(color);
  }
}
