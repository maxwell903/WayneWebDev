import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="projects-card">
        <h2>PROJECTS</h2>
        <div *ngFor="let project of projects" class="project-entry">
          <div class="project-line">
            <span class="project-name">{{project.title}}</span>
            <span class="project-type">{{project.technologies[0]}}</span>
          </div>
          <div class="description-line">
            <span class="description">{{project.description}}</span>
          </div>
          <ul class="technology-list">
            <li *ngIf="project.id === 'sophit-training'">
              <a [routerLink]="['/projects']">
                • Personal training service platform featuring engaging animations and responsive design
              </a>
            </li>
            <li *ngIf="project.id === 'sophit-training'">
              <a [routerLink]="['/projects']">
                • Intuitive UI with expandable cards, qualification showcases, and streamlined service selection
              </a>
            </li>
            <li *ngIf="project.id === 'sophit-training'">
              <a [routerLink]="['/projects']">
                • Implements thoughtful component architecture with TypeScript for maintainability and type safety
              </a>
            </li>
            <li *ngIf="project.id === 'groshme-beta'">
              <a [routerLink]="['/projects']">
                • Comprehensive Personal management system where users create and manage budgets, exercises, workouts recipes, menus, grocery lists, and meal plans
              </a>
            </li>
            <li *ngIf="project.id === 'groshme-beta'">
              <a [routerLink]="['/projects']">
                • Full-stack application with sophisticated state management, complex data processing, and authentication with user specific data
              </a>
            </li>
            <li *ngIf="project.id === 'groshme-beta'">
              <a [routerLink]="['/projects']">
                • Next.js/React frontend that handles user interfaces and interactions, a Python Flask backend that manages data processing and API endpoints
              </a>
            </li>
            <li *ngIf="project.id === 'groshme-beta'">
              <a [routerLink]="['/projects']">
                • Designed and implemented PostgreSQL database system initially in MySQL then migrated to Supabase, with complex schemas for functions using advanced SQL features.
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./projects-summary.component.css']
})
export class ProjectsSummaryComponent implements OnInit {
  projects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    // Get featured projects from the service
    this.projects = this.projectService.getFeaturedProjects();
  }
}