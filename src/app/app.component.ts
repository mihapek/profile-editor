import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet, provideRouter } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
