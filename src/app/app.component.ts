import {Component, EventEmitter} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {MainComponent} from './layout/main/main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fitness-tracker';

  color = 'white';

  onColorChange(newColor: string) {
    this.color = newColor;
  }
}
