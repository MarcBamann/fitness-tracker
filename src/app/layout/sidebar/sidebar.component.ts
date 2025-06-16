import {Component} from '@angular/core';
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
export class SidebarComponent {}
