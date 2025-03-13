import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkillsDashboardComponent } from '../../components/skills-dashboard/skills-dashboard.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkillsDashboardComponent,
    ProjectCardComponent,
    ExperienceTimelineComponent
  ]
})
export class HomeComponent {
  featuredProjects = [
    {
      id: 'project1',
      title: 'Large Netlify Project',
      description: 'A comprehensive web application deployed through Netlify and GitHub.',
      technologies: ['Angular', 'TypeScript', 'Netlify'],
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://project1.example.com',
      githubUrl: 'https://github.com/yourusername/project1',
      details: 'This project showcases my ability to build and deploy complex web applications. It includes [specific features and technical implementations].'
    },
    {
      id: 'project2',
      title: 'Small Netlify Project',
      description: 'A focused single-purpose application with clean architecture.',
      technologies: ['React', 'JavaScript', 'Netlify'],
      imageUrl: '/assets/images/project-placeholder.jpg',
      demoUrl: 'https://project2.example.com',
      githubUrl: 'https://github.com/yourusername/project2',
      details: 'This smaller project demonstrates my attention to detail and ability to create efficient, targeted solutions. It includes [specific features and technical implementations].'
    }
  ];
}