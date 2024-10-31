// Angular Core
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular CDK
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

// Angular Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Services
import { TaskService } from '../task.service';

// Models
import { Task } from '../../../models/task.model';

// Components
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatDialogModule,
  ],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent implements OnChanges {
  testData: Task[] = [];
  @Input() selectedDate: string | null = null;

  timeSlots: { label: string; title: Task[] }[] = []; // Change title to Task[]

  constructor(
    private taskService: TaskService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskService.currentTasks.subscribe((tasks) => {
      this.testData = tasks;
      if (this.selectedDate) {
        this.updateSlotsForDate(this.selectedDate);
      }
    });
  }

  ngOnChanges() {
    if (this.selectedDate) {
      this.updateSlotsForDate(this.selectedDate);
    }
  }

  updateSlotsForDate(date: string) {
    const filteredTasks = this.testData.filter((task) => task.date === date);

    this.timeSlots = Array.from({ length: 24 }, (_, hour) => {
      const formattedHour =
        hour < 12 ? (hour === 0 ? '12AM' : `${hour}AM`) : `${hour - 12}PM`;
      return { label: formattedHour, title: [] };
    });

    filteredTasks.forEach((item) => {
      const hour = parseInt(item.start_time.split(':')[0], 10);
      if (hour >= 0 && hour < 24) {
        this.timeSlots[hour].title.push(item); // Push the entire task object
      }
    });
  }

  openEditTaskForm(task: Task) {
    console.log('Task ID:', task.id);
    console.log('Task Data:', task);

    const dialogRef = this._matDialog.open(EditComponent, {
      width: '400px',
      data: task,
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Persist changes in TaskService after drag-and-drop
    this.updateTasksInService();
  }

  updateTasksInService() {
    const updatedTasks = this.timeSlots.reduce((acc: Task[], slot, hour) => {
      const tasksAtThisTime: Task[] = slot.title.map((task) => ({
        ...task,
        date: this.selectedDate,
        start_time: `${hour < 10 ? '0' : ''}${hour}:00`,
      }));

      return acc.concat(tasksAtThisTime);
    }, []);

    const otherTasks = this.testData.filter(
      (task) => task.date !== this.selectedDate
    );

    this.taskService.tasksSource.next([...otherTasks, ...updatedTasks]);
  }
}
