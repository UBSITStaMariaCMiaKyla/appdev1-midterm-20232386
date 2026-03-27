import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-info.html',
  styleUrl: './task-info.css'
})
export class TaskInfoComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    const idParam = this.route.parent?.snapshot.paramMap.get('id');
    const id = Number(idParam);
    this.task = this.taskService.getTaskById(id);
  }

  getPriorityClass(priority: string): string {
    if (priority === 'High') return 'badge bg-danger';
    if (priority === 'Medium') return 'badge bg-warning text-dark';
    return 'badge bg-success';
  }
}