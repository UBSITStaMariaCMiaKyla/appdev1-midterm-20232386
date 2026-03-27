import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design UI Mockup',
      description: 'Create wireframes for the TaskFlow application homepage.',
      dueDate: '2026-04-01',
      status: 'Completed',
      priority: 'High',
      createdAt: '2026-03-20'
    },
    {
      id: 2,
      title: 'Set Up Angular Project',
      description: 'Initialize the Angular v21 project with routing and standalone components.',
      dueDate: '2026-04-05',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2026-03-21'
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Cover all service methods with Jasmine unit tests.',
      dueDate: '2026-04-15',
      status: 'Pending',
      priority: 'Medium',
      createdAt: '2026-03-22'
    },
    {
      id: 4,
      title: 'Deploy to GitHub Pages',
      description: 'Build the production bundle and deploy the app online.',
      dueDate: '2026-04-20',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2026-03-23'
    }
  ];

  private nextId = 5;

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.nextId++,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.tasks.push(newTask);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      if (task.status === 'Pending') {
        task.status = 'In Progress';
      } else if (task.status === 'In Progress') {
        task.status = 'Completed';
      } else {
        task.status = 'Pending';
      }
    }
  }
}