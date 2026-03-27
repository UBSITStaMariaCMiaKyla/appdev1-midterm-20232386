import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;
  title = '';
  description = '';
  dueDate = '';
  status: 'Pending' | 'In Progress' | 'Completed' = 'Pending';
  priority: 'Low' | 'Medium' | 'High' = 'Medium';
  showError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.parent?.snapshot.paramMap.get('id');
    const id = Number(idParam);
    this.task = this.taskService.getTaskById(id);
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
      this.dueDate = this.task.dueDate;
      this.status = this.task.status;
      this.priority = this.task.priority;
    }
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.description.trim() || !this.dueDate) {
      this.showError = true;
      return;
    }
    if (this.task) {
      this.taskService.updateTask({
        ...this.task,
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
        priority: this.priority
      });
      this.router.navigate(['/tasks', this.task.id, 'info']);
    }
  }
}