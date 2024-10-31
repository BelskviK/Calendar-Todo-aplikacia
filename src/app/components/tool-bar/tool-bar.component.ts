// Angular Core
import { Component } from '@angular/core';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Components
import { CreateComponent } from '../create/create.component';

// Services
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class ToolBarComponent {
  constructor(
    private _matDialog: MatDialog,
    private drawerService: DrawerService
  ) {}

  openAddTaskForm() {
    this._matDialog.open(CreateComponent, {
      width: '400px',
    });
  }

  toggleDrawer() {
    this.drawerService.toggleDrawer(); // Toggle the drawer state Sidebar
  }
}
