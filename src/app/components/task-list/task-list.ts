import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      this.taskService.deleteTask(id);
      this.tasks = this.taskService.getTasks();
    }
  }

  toggleStatus(id: number): void {
    this.taskService.toggleStatus(id);
    this.tasks = this.taskService.getTasks();
  }

  getPriorityClass(priority: string): string {
    if (priority === 'High') return 'badge bg-danger';
    if (priority === 'Medium') return 'badge bg-warning text-dark';
    return 'badge bg-success';
  }

  getStatusClass(status: string): string {
    if (status === 'Completed') return 'badge bg-success';
    if (status === 'In Progress') return 'badge bg-primary';
    return 'badge bg-secondary';
  }
}