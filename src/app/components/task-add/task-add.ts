import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css'
})
export class TaskAddComponent {
  title = '';
  description = '';
  dueDate = '';
  status: 'Pending' | 'In Progress' | 'Completed' = 'Pending';
  priority: 'Low' | 'Medium' | 'High' = 'Medium';
  showError = false;
  showSuccess = false;

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(): void {
    if (!this.title.trim() || !this.description.trim() || !this.dueDate) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.taskService.addTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority
    });
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks']), 1000);
  }
}