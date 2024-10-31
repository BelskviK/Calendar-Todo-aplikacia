import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerOpenedSubject = new BehaviorSubject<boolean>(true); // Default state
  drawerOpened$ = this.drawerOpenedSubject.asObservable();

  closeDrawer() {
    this.drawerOpenedSubject.next(false); // Close the drawer
  }

  openDrawer() {
    this.drawerOpenedSubject.next(true); // Open the drawer
  }

  toggleDrawer() {
    this.drawerOpenedSubject.next(!this.drawerOpenedSubject.value); // Toggle the drawer
  }
}
