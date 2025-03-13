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
      details: 'This project showcases my ability to build and deploy complex web applications.',
      challenge: 'Building a scalable application with dynamic content while ensuring fast load times.',
      approaches: [
        'Implemented lazy loading modules to improve initial load time',
        'Used Angular SSR for SEO optimization',
        'Implemented strategic caching with Netlify'
      ],
      features: [
        'Server-side rendering',
        'Responsive design',
        'Authentication system',
        'Content management'
      ],
      outcome: 'Successfully launched with 30% faster load times than previous version.'
    },
    {
      id: 'project2',
      title: 'Small Netlify Project',
      description: 'A focused single-purpose application with clean architecture.',
      technologies: ['React', 'JavaScript', 'Netlify'],
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://project2.example.com',
      githubUrl: 'https://github.com/yourusername/project2',
      details: 'This smaller project demonstrates my attention to detail and ability to create efficient solutions.',
      challenge: 'Creating an intuitive UI for complex data visualization.',
      approaches: [
        'Used React hooks for state management',
        'Implemented responsive charts with D3.js',
        'Applied accessibility best practices'
      ],
      features: [
        'Interactive data visualization',
        'Filtering and sorting options',
        'Data export functionality',
        'Theme customization'
      ],
      outcome: 'Received positive feedback for intuitive design and performance.'
    }
  ];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}