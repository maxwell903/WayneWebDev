import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 'project1',
      title: 'GroshmeBeta - Comprehensive Meal Planning Platform',
      description: 'A full-stack application designed to simplify meal planning, grocery shopping, and recipe management. The platform allows users to create and manage recipes, plan weekly meals, generate grocery lists, track kitchen inventory, and monitor fitness with workout scheduling tools.',
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://groshmebeta.netlify.app',
      githubUrl: '#',
      technologies: [
        'React/Next.js', 'Python/Flask', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 
        'JWT Authentication', 'RxJS', 'Netlify'
      ],
      details: 'Built a scalable application with dynamic content while ensuring fast load times and intuitive user experience.',
      challenge: 'Building a scalable application with dynamic content while ensuring fast load times and intuitive user experience.',
      approaches: [
        'Implemented React component architecture for maintainable UI',
        'Developed a RESTful API with Flask for consistent data access',
        'Created efficient database schema for complex relationships',
        'Designed responsive interfaces for mobile and desktop users'
      ],
      outcome: 'Successfully developed a comprehensive meal planning platform that streamlines the entire process from recipe creation to grocery shopping, with integrated fitness tracking features.',
      features: [
        'Recipe Management & Nutrition Tracking',
        'Meal Prep Calendar with Weekly Planning',
        'Smart Grocery List Generation',
        'Kitchen Inventory Management',
        'Workout & Exercise Scheduling',
        'Budget Tracking & Financial Management'
      ]
    },
    {
      id: 'project2',
      title: 'SophitTraining - Personal Training Service Platform',
      description: 'A modern, engaging website for a personal training business featuring animated UI components, responsive design, and customer engagement tools. The site showcases trainer services, qualifications, and provides easy contact methods for potential clients.',
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://sophittrainingco.com',
      githubUrl: '#',
      technologies: [
        'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 
        'EmailJS', 'Responsive Design', 'Netlify'
      ],
      details: 'Created an engaging, visually rich website while maintaining performance and accessibility across all devices.',
      challenge: 'Creating an engaging, visually rich website while maintaining performance and accessibility across all devices.',
      approaches: [
        'Utilized TypeScript for type-safe development',
        'Implemented advanced animations with performance optimization',
        'Designed a component-based architecture for code reuse',
        'Created a responsive layout system for all device sizes'
      ],
      outcome: 'Delivered a modern, accessible website that effectively showcases the personal training services with engaging interactive elements and optimized performance.',
      features: [
        'Interactive Service Selection Interface',
        'Advanced Animation Framework',
        'Responsive Design Architecture',
        'Integrated Contact System',
        'Interactive Qualification Cards'
      ]
    }
  ];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}