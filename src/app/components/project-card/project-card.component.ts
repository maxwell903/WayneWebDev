import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../components/project-card/project-card.component';
import { ProjectService, Project } from '../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section class="projects-section">
      <div class="container">
        <div class="projects-header">
          <h1 class="section-title">My Projects</h1>
          <p>Here you'll find a selection of my recent work. Each project represents different challenges and solutions in web development.</p>
        </div>
        
        <div class="filter-container">
          <div class="filter-label">Filter by skills:</div>
          <div class="filter-buttons">
            <button 
              class="filter-btn" 
              [class.active]="selectedSkill === 'All'"
              (click)="filterBySkill('All')">
              All
            </button>
            <button 
              *ngFor="let skill of availableSkills" 
              class="filter-btn" 
              [class.active]="selectedSkill === skill"
              (click)="filterBySkill(skill)">
              {{skill}}
            </button>
          </div>
        </div>
        
        <div class="projects-grid">
          <app-project-card 
            *ngFor="let project of filteredProjects" 
            [project]="project">
          </app-project-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 80px 0;
      background-color: var(--light);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .projects-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--secondary);
    }
    
    .filter-container {
      margin-bottom: 40px;
    }
    
    .filter-label {
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--secondary);
    }
    
    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .filter-btn {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid var(--primary);
      background: transparent;
      color: var(--primary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .filter-btn.active, .filter-btn:hover {
      background-color: var(--primary);
      color: white;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 30px;
    }
    
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      
      .section-title {
        font-size: 2rem;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  availableSkills: string[] = [];
  selectedSkill: string = 'All';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    this.filteredProjects = [...this.projects];
    
    // Extract all unique skills
    const skillsSet = new Set<string>();
    this.projects.forEach(project => {
      project.skills.forEach(skill => skillsSet.add(skill));
    });
    this.availableSkills = Array.from(skillsSet).sort();
  }

  filterBySkill(skill: string): void {
    this.selectedSkill = skill;
    
    if (skill === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.skills.includes(skill)
      );
    }
  }
}