// Angular Core
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  taskForm: FormGroup;
  timeOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
    });

    this.generateTimeOptions();
  }

  generateTimeOptions() {
    const times: string[] = [];
    const formatTime12 = (hours: number, minutes: number) => {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour = hours % 12 || 12;
      const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hour}:${minuteStr} ${ampm}`;
    };

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        times.push(formatTime12(i, j));
      }
    }
    this.timeOptions = times;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const task: Omit<Task, 'id'> = {
        title: taskData.title,
        date: taskData.date.toISOString().split('T')[0],
        start_time: taskData.startTime,
      };
      this.taskService.addTask(task);
      console.log('Task added:', task);
      this.dialogRef.close();
    }
  }
}
