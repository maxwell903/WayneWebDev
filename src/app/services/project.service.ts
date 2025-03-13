import { Injectable } from '@angular/core';
import { Project } from '../models/project.model'; // Use your existing Project model

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  features: ProjectFeature[];
  technologies: string[];
  skills: string[];
  challenge?: string;
  approaches?: string[];
  outcome?: string;
}

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
      features: [
        {
          title: 'Recipe Management & Nutrition Tracking',
          description: 'Engineered a sophisticated recipe database system that stores detailed ingredient information, preparation instructions, and automatically calculates comprehensive nutritional data. The system employs a relational database architecture to maintain ingredient relationships while implementing custom algorithms that compute protein, carbs, and fat macros based on ingredient quantities and serving sizes.'
        },
        {
          title: 'Meal Prep Calendar with Weekly Planning',
          description: 'Developed an intuitive calendar interface for scheduling meals across the week using a dynamic grid system. Users can assign recipes to specific days and meal types (breakfast, lunch, dinner) with a simple interface. The calendar system maintains state across sessions and updates in real-time, allowing for seamless meal organization and visualization of the weekly nutrition distribution.'
        },
        {
          title: 'Smart Grocery List Generation',
          description: 'Created an intelligent grocery list system that analyzes planned meals, consolidates required ingredients, and accounts for current inventory. The algorithm identifies ingredient overlaps between recipes, combines quantities with unit conversion, and marks items already in the user\'s inventory to create optimized shopping lists. Users can export lists, mark items as purchased, and track spending patterns over time.'
        },
        {
          title: 'Kitchen Inventory Management',
          description: 'Built a comprehensive inventory management system that tracks ingredients, quantities, and expiration dates. The feature integrates with the grocery list and recipe systems to provide real-time updates as ingredients are used in cooking or newly purchased. The inventory includes image recognition capabilities to add items by scanning receipts and predictive analytics to suggest restocking based on usage patterns.'
        },
        {
          title: 'Workout & Exercise Scheduling',
          description: 'Implemented a complete fitness tracking module that allows users to create custom workout routines, track exercise progress, and schedule weekly workout plans. The system stores detailed exercise information including sets, reps, and weights while generating progress charts to visualize improvements over time. The workout scheduler integrates with the meal planning calendar to ensure proper nutrition aligns with exercise goals.'
        },
        {
          title: 'Budget Tracking & Financial Management',
          description: 'Designed a comprehensive financial tracking system that monitors grocery spending, analyzes cost per meal, and helps users optimize their food budget. The feature implements custom data visualization to show spending trends, compares actual versus planned expenses, and provides insights on the most cost-effective meal options. The budget module integrates with grocery lists to project costs before shopping trips.'
        }
      ],
      technologies: [
        'React/Next.js', 'Python/Flask', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 
        'JWT Authentication', 'RxJS', 'Netlify'
      ],
      skills: [
        'Full-Stack Development', 'API Design', 'Database Architecture', 
        'State Management', 'Responsive Design', 'Authentication', 
        'Algorithm Development', 'Data Visualization'
      ],
      challenge: 'Building a scalable application with dynamic content while ensuring fast load times and intuitive user experience.',
      approaches: [
        'Implemented React component architecture for maintainable UI',
        'Developed a RESTful API with Flask for consistent data access',
        'Created efficient database schema for complex relationships',
        'Designed responsive interfaces for mobile and desktop users'
      ],
      outcome: 'Successfully developed a comprehensive meal planning platform that streamlines the entire process from recipe creation to grocery shopping, with integrated fitness tracking features.'
    },
    {
      id: 'project2',
      title: 'SophitTraining - Personal Training Service Platform',
      description: 'A modern, engaging website for a personal training business featuring animated UI components, responsive design, and customer engagement tools. The site showcases trainer services, qualifications, and provides easy contact methods for potential clients.',
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://sophittrainingco.com',
      githubUrl: '#',
      features: [
        {
          title: 'Interactive Service Selection Interface',
          description: 'Designed and implemented a dynamic service selection system with content that changes based on user interaction. The feature uses smooth transitions and maintains context as users explore different training packages. Each service category includes detailed pricing information, service descriptions, and visual elements that highlight the offering while preserving a consistent user experience throughout the exploration process.'
        },
        {
          title: 'Advanced Animation Framework',
          description: 'Built a sophisticated animation system using Framer Motion to create engaging, performance-optimized interactions throughout the site. The animations include parallax scrolling effects, element reveals tied to viewport position, and micro-interactions that respond to user behavior. The system is designed with accessibility in mind, respecting user preferences for reduced motion while still providing visual interest and guidance.'
        },
        {
          title: 'Responsive Design Architecture',
          description: 'Implemented a fully responsive design system that provides optimal viewing across all device sizes from mobile phones to large desktop displays. The approach uses a combination of fluid layouts, strategic breakpoints, and conditional rendering to ensure content looks intentional at every screen size. The responsive architecture includes specialized navigation handling for mobile devices and touch-optimized interaction patterns.'
        },
        {
          title: 'Integrated Contact System',
          description: 'Developed a streamlined contact solution that connects directly with EmailJS to deliver messages without requiring server-side code. The form includes real-time validation, intelligent error handling with user-friendly messages, and visual confirmation of successful submission. The system includes spam prevention measures while maintaining a frictionless experience for legitimate inquiries.'
        },
        {
          title: 'Interactive Qualification Cards',
          description: 'Created interactive qualification cards that expand with detailed information when clicked or hovered. The component uses subtle animations to draw attention and implements event delegation for efficient handling of user interactions. The cards feature optimized image loading with blur-up techniques and maintain accessibility with keyboard navigation support and appropriate ARIA attributes.'
        }
      ],
      technologies: [
        'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 
        'EmailJS', 'Responsive Design', 'Netlify'
      ],
      skills: [
        'Frontend Development', 'UI/UX Design', 'Animation', 
        'Performance Optimization', 'Accessibility', 'Component Architecture',
        'Responsive Design', 'CSS/SCSS'
      ],
      challenge: 'Creating an engaging, visually rich website while maintaining performance and accessibility across all devices.',
      approaches: [
        'Utilized TypeScript for type-safe development',
        'Implemented advanced animations with performance optimization',
        'Designed a component-based architecture for code reuse',
        'Created a responsive layout system for all device sizes'
      ],
      outcome: 'Delivered a modern, accessible website that effectively showcases the personal training services with engaging interactive elements and optimized performance.'
    }
  ];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}