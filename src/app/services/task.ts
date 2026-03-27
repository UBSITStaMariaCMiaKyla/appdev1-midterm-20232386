import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Initial Client Meeting',
      description: 'Conduct kickoff meeting with the client to discuss project goals, timeline, and deliverables.',
      dueDate: '2026-04-01',
      status: 'Completed',
      priority: 'High',
      createdAt: '2026-03-20'
    },
    {
      id: 2,
      title: 'Requirements Gathering',
      description: 'Document all functional and non-functional requirements based on client input and discussions.',
      dueDate: '2026-04-05',
      status: 'Completed',
      priority: 'High',
      createdAt: '2026-03-21'
    },
    {
      id: 3,
      title: 'UI/UX Design Presentation',
      description: 'Present the initial wireframes and design mockups to the client for review and approval.',
      dueDate: '2026-04-10',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2026-03-22'
    },
    {
      id: 4,
      title: 'Database Schema Implementation',
      description: 'Set up and implement the database schema based on the approved system design.',
      dueDate: '2026-04-14',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2026-03-23'
    },
    {
      id: 5,
      title: 'Backend API Development',
      description: 'Develop and test the REST API endpoints for the core features of the client system.',
      dueDate: '2026-04-20',
      status: 'Pending',
      priority: 'High',
      createdAt: '2026-03-24'
    },
    {
      id: 6,
      title: 'Progress Update Meeting',
      description: 'Schedule and conduct a mid-project check-in with the client to present progress and gather feedback.',
      dueDate: '2026-04-22',
      status: 'Pending',
      priority: 'Medium',
      createdAt: '2026-03-25'
    },
    {
      id: 7,
      title: 'User Acceptance Testing',
      description: 'Coordinate UAT session with the client to validate features before final deployment.',
      dueDate: '2026-04-28',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2026-03-26'
    }
  ];

  private nextId = 8;

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