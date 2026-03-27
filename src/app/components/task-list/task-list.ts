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
  showModal = false;
  taskToDeleteId: number | null = null;
  taskToDeleteTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  confirmDelete(id: number, title: string): void {
    this.taskToDeleteId = id;
    this.taskToDeleteTitle = title;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.taskToDeleteId = null;
    this.taskToDeleteTitle = '';
  }

  confirmDeleteFinal(): void {
    if (this.taskToDeleteId !== null) {
      this.taskService.deleteTask(this.taskToDeleteId);
      this.tasks = this.taskService.getTasks();
    }
    this.cancelDelete();
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