import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project } from '../../models/project.model';

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
  
  filters: string[] = ['All', 'Angular', 'React', 'Node.js', 'TypeScript'];
  
  ngOnInit(): void {
    // Initialize with sample projects
    this.projects = [
      {
        id: 'project1',
        title: 'Large Netlify Project',
        description: 'A comprehensive web application deployed through Netlify and GitHub.',
        technologies: ['Angular', 'TypeScript', 'Netlify'],
        imageUrl: '/assets/images/project-placeholder.jpg',
        demoUrl: 'https://project1.example.com',
        githubUrl: 'https://github.com/yourusername/project1',
        details: 'This project showcases my ability to build and deploy complex web applications.'
      },
      {
        id: 'project2',
        title: 'Small Netlify Project',
        description: 'A focused single-purpose application with clean architecture.',
        technologies: ['React', 'JavaScript', 'Netlify'],
        imageUrl: '/assets/images/project-placeholder.jpg',
        demoUrl: 'https://project2.example.com',
        githubUrl: 'https://github.com/yourusername/project2',
        details: 'This smaller project demonstrates my attention to detail and ability to create efficient solutions.'
      }
    ];
    
    this.filteredProjects = [...this.projects];
  }
  
  filterProjects(tech: string): void {
    this.activeFilter = tech;
    
    if (tech === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.technologies.includes(tech)
      );
    }
  }
}