import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-summary.component.html',
  styleUrls: ['./projects-summary.component.css']
})
export class ProjectsSummaryComponent implements OnInit {
  projects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    // Get all projects from the service
    const allProjects = this.projectService.getAllProjects();
    
    // Display all projects (since there are only 2 in this case)
    // In a real scenario with many projects, we might limit this to 3-4 recent ones
    this.projects = allProjects;
  }
}