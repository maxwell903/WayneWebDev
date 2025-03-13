import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProjectCardComponent {
  @Input() project!: Project;
  isExpanded = false;

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
}
