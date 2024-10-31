// Angular Core
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Output() dateChanged = new EventEmitter<string>();

  selected: Date | null = null;

  onDateSelected() {
    if (this.selected) {
      // Format the date as 'YYYY-MM-DD' for comparison
      const formattedDate = this.selected.toISOString().split('T')[0];
      this.dateChanged.emit(formattedDate);
    }
  }
}
