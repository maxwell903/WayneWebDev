// src/app/models/project.model.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    demoUrl: string;
    githubUrl: string;
    details: string;
  }
  
  // src/app/services/project.service.ts
  import { Injectable } from '@angular/core';
  import { Project } from '../models/project.model';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    private projects: Project[] = [
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
  
    getAllProjects(): Project[] {
      return this.projects;
    }
  
    getProjectById(id: string): Project | undefined {
      return this.projects.find(project => project.id === id);
    }
  }