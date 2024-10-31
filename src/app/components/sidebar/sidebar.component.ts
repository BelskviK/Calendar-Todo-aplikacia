// Angular Core
import { Component, OnInit } from '@angular/core';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';

// Services
import { DrawerService } from '../drawer.service';

// Components
import { SlotsComponent } from '../slots/slots.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, SlotsComponent, CalendarComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  selectedDate: string | null = null;
  isDrawerOpened: boolean = true; // Track the drawer open state

  constructor(private drawerService: DrawerService) {}

  ngOnInit() {
    this.drawerService.drawerOpened$.subscribe((isOpened) => {
      this.isDrawerOpened = isOpened;
    });
  }

  onDateChanged(date: string) {
    this.selectedDate = date;
  }
}
