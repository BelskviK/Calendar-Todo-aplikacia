// Angular Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { SlotsComponent } from './components/slots/slots.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    SidebarComponent,
    ToolBarComponent,
    SlotsComponent,
    CalendarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
