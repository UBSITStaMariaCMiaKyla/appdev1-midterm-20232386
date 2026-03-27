import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  invalidId = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (isNaN(id)) {
      this.invalidId = true;
      return;
    }
    this.task = this.taskService.getTaskById(id);
    if (!this.task) {
      this.invalidId = true;
    }
  }

  getStatusClass(status: string): string {
    if (status === 'Completed') return 'badge bg-success';
    if (status === 'In Progress') return 'badge bg-primary';
    return 'badge bg-secondary';
  }
}