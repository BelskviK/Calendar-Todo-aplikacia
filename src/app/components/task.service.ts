import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// model
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasksSource = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Groceries', date: '2024-09-05', start_time: '00:45' },
    { id: 2, title: 'Meeting', date: '2024-09-01', start_time: '01:30' },
    { id: 3, title: 'Wife', date: '2024-09-16', start_time: '02:15 AM' },
    { id: 4, title: 'Kids', date: '2024-09-16', start_time: '02:45' },
    { id: 5, title: 'Coding', date: '2024-09-16', start_time: '03:00' },
    { id: 6, title: 'Coding', date: '2024-09-02', start_time: '04:15' },
    { id: 7, title: 'Coding', date: '2024-09-03', start_time: '05:30' },
    { id: 8, title: 'Coding', date: '2024-09-22', start_time: '06:00' },
    { id: 9, title: 'Coding', date: '2024-09-20', start_time: '07:45' },
    { id: 10, title: 'Vacation', date: '2024-09-20', start_time: '08:30' },
    { id: 11, title: 'Couriering', date: '2024-09-10', start_time: '09:15' },
    { id: 12, title: 'Couriering', date: '2024-09-13', start_time: '10:00' },
    { id: 13, title: 'Planning', date: '2024-09-13', start_time: '11:30' },
  ]);

  currentTasks = this.tasksSource.asObservable();

  addTask(newTask: Omit<Task, 'id'>) {
    const currentTasks = this.tasksSource.getValue();

    // Find the next available ID
    let newId = 1;
    while (currentTasks.some((task) => task.id === newId)) {
      newId++;
    }

    const taskWithId = { ...newTask, id: newId }; // Create a new task with the unique ID
    this.tasksSource.next([...currentTasks, taskWithId]);
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSource.getValue();
    const taskIndex = currentTasks.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (taskIndex !== -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[taskIndex] = updatedTask;
      this.tasksSource.next(updatedTasks);
    }
  }

  deleteTask(taskId: number) {
    const currentTasks = this.tasksSource.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSource.next(updatedTasks);
    console.log(`Task with ID ${taskId} deleted.`);
  }
}
