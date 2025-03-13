import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [CommonModule, ProjectCardComponent]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter: string = 'All';
  
  // Updated filters based on the technologies used in both projects
  filters: string[] = [
    'All', 
    'React', 
    'Next.js', 
    'TypeScript', 
    'Python', 
    'Flask', 
    'PostgreSQL', 
    'Tailwind CSS'
  ];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    // Get all projects from the service
    this.projects = this.projectService.getAllProjects();
    this.filteredProjects = [...this.projects];
  }
  
  filterProjects(tech: string): void {
    this.activeFilter = tech;
    
    if (tech === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.technologies.some(t => t.includes(tech))
      );
    }
  }
}