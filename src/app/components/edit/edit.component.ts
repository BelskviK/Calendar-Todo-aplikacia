// Angular Core
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

// Services
import { TaskService } from '../task.service';

// Models
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  taskForm: FormGroup;
  timeOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = this.fb.group({
      title: [data.title, [Validators.required, Validators.minLength(3)]],
      date: [data.date ? new Date(data.date) : '', Validators.required],
      startTime: [this.formatStartTime(data.start_time), Validators.required],
    });

    this.generateTimeOptions();
  }

  private formatStartTime(start_time: string): string {
    const timeParts = start_time.split(' ');
    if (timeParts.length > 1) {
      return start_time; // Already in correct format
    }

    const [hours, minutes] = start_time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert to 12-hour format
    return `${hour12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  }

  generateTimeOptions() {
    const times: string[] = [];
    const formatTime = (hours: number, minutes: number) => {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour = hours % 12 || 12;
      const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hour}:${minuteStr} ${ampm}`;
    };

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        times.push(formatTime(i, j));
      }
    }
    this.timeOptions = times;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const updatedTask: Task = {
        id: this.data.id,
        title: taskData.title,
        date: taskData.date.toISOString().split('T')[0],
        start_time: taskData.startTime,
      };

      this.taskService.updateTask(updatedTask);
      console.log('Task updated:', updatedTask);
      this.dialogRef.close();
    }
  }

  onDelete() {
    const taskId = this.data.id;
    this.taskService.deleteTask(taskId);
    console.log('Task deleted:', taskId);
    this.dialogRef.close();
  }
}
