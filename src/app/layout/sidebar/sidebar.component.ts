import {Component} from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {UserComponent} from './user/user.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    NavComponent,
    UserComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {}
