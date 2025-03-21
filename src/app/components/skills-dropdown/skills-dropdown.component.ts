import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  name: string;
  description: string;
  skills: SkillItem[];
  isOpen: boolean;
}

interface SkillItem {
  name: string;
  description: string;
}

@Component({
  selector: 'app-skills-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills-dropdown">
      <div 
        class="skills-trigger" 
        (click)="toggleSkillsOpen()"
        [class.active]="isSkillsOpen">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          [class.rotated]="isSkillsOpen"
          class="chevron-icon">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span *ngIf="projectId === 'groshme-beta'">Core Languages Used: JavaScript, Python, SQL, HTML, CSS, JSON</span>
        <span *ngIf="projectId === 'sophit-training'">Core Languages Used: JavaScript/TypeScript, HTML, CSS, JSON</span>
        <span *ngIf="projectId === 'portfolio-website'">Core Languages Used: TypeScript, HTML, CSS, Angular Template Syntax</span>
      </div>
      
      <div class="skills-content" *ngIf="isSkillsOpen">
        <div class="category-buttons">
          <button 
            *ngFor="let category of skillCategories" 
            class="category-button"
            [class.active]="category.isOpen"
            (click)="toggleCategory(category)">
            {{category.name}}
          </button>
        </div>
        
        <div class="skill-categories">
          <div 
            *ngFor="let category of skillCategories" 
            class="skill-category"
            [class.open]="category.isOpen">
            <div class="category-description" *ngIf="category.isOpen">
              {{category.description}}
            </div>
            
            <ul class="skills-list" *ngIf="category.isOpen">
              <li *ngFor="let skill of category.skills" class="skill-item">
                <span class="skill-name">{{skill.name}}</span>
                <span class="skill-description">{{skill.description}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-dropdown {
      margin-top: 2px;
      margin-bottom: 2px;
    }
    
    .skills-trigger {
  color: var(--gray, #95a5a6);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0; /* Completely removed padding */
  transition: all 0.2s ease;
  margin: 0; /* Removed all margins */
  font-size: 0.85rem; /* Smaller font size */
  line-height: 1.2; /* Tighter line height */
}
    
    .skills-trigger:hover {
      color: var(--primary, #3498db);
    }
    
    .skills-trigger.active {
      color: var(--primary, #3498db);
    }
    
    .chevron-icon {
      margin-right: 8px;
      transition: transform 0.3s ease;
    }
    
    .chevron-icon.rotated {
      transform: rotate(180deg);
    }
    
    .skills-content {
      padding-top: 5px;
      padding-bottom: 0px;
      animation: fadeIn 0.3s ease-out;
    }
    
    .category-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 2px;
    }
    
    .category-button {
      background-color: var(--light);
      border: 1px solid var(--light-gray);
      border-radius: 20px;
      padding: 3px 6px;
      font-size: 0.85rem;
      color: var(--gray);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .category-button:hover {
      background-color: rgba(52, 152, 219, 0.1);
      color: var(--primary);
      border-color: var(--primary);
      transform: translateY(-2px);
    }
    
    .category-button.active {
      background-color: var(--primary);
      color: white;
      border-color: var(--primary);
    }
    
    .skill-category {
      margin-bottom: 2px;
    }
    
    .category-description {
      color: var(--gray);
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 2px;
      padding-left: 8px;
      border-left: 2px solid var(--primary);
    }
    
    .skills-list {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    
    .skill-item {
      margin-bottom: 2px;
      padding-left: 8px;
      border-left: 2px solid rgba(52, 152, 219, 0.2);
    }
    
    .skill-name {
      display: block;
      font-weight: 500;
      color: var(--dark);
    }
    
    .skill-description {
      display: block;
      font-size: 0.85rem;
      color: var(--gray);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .category-buttons {
        flex-direction: column;
        gap: 5px;
      }
      
      .category-button {
        width: 100%;
        text-align: left;
      }
    }
  `]
})
export class SkillsDropdownComponent {
  @Input() projectId: string = '';
  
  isSkillsOpen: boolean = false;
  skillCategories: SkillCategory[] = [];
  
  // Default skills for when no specific project is selected
  private defaultSkillCategories: SkillCategory[] = [
    {
      name: 'Core Technologies',
      description: 'The fundamental programming languages and frameworks that form the backbone of this application',
      skills: [],
      isOpen: false
    },
    {
      name: 'UI & UX Tools',
      description: 'Presentation, styling, and user interaction technologies',
      skills: [],
      isOpen: false
    },
    {
      name: 'Data Management',
      description: 'Storing, retrieving, manipulating, and processing data',
      skills: [],
      isOpen: false
    },
    {
      name: 'Infrastructure',
      description: 'Platforms, tools, and configurations for deploying and running the application',
      skills: [],
      isOpen: false
    }
  ];
  
  // Groshme Beta skills organized by category
  private groshmeBetaSkills: {[key: string]: SkillItem[]} = {
    'Core Technologies': [
      { name: 'JavaScript & JSX', description: 'Primary frontend programming languages' },
      { name: 'Python', description: 'Primary backend programming language' },
      { name: 'React & Next.js', description: 'Frontend framework ecosystem' },
      { name: 'Flask', description: 'Backend web framework' },
      { name: 'PostgreSQL', description: 'Database system' },
      { name: 'Supabase', description: 'Backend-as-a-Service platform providing database and authentication' },
      { name: 'REST API', description: 'Communication architecture between frontend and backend' }
    ],
    'UI & UX Tools': [
      { name: 'Tailwind CSS', description: 'Styling framework' },
      { name: 'Lucide React', description: 'Icon library' },
      { name: 'Shadcn/UI', description: 'Component library' },
      { name: 'Recharts', description: 'Data visualization library' },
      { name: 'Context API', description: 'State management for UI components' },
      { name: 'Lodash', description: 'Frontend utility functions' }
    ],
    'Data Management': [
      { name: 'SQLAlchemy', description: 'Object-Relational Mapping library' },
      { name: 'Flask-Migrate & Alembic', description: 'Database migration tools' },
      { name: 'FuzzyWuzzy & Python-Levenshtein', description: 'String matching and processing libraries' },
      { name: 'PyJWT', description: 'Token management for authentication' },
      { name: 'CSV handling', description: 'For data import/export functionality' },
      { name: 'dateutil & pytz', description: 'Date and time processing libraries' }
    ],
    'Infrastructure': [
      { name: 'Heroku', description: 'Backend deployment platform' },
      { name: 'Netlify', description: 'Frontend deployment platform' },
      { name: 'Environment Variables', description: 'Configuration management' },
      { name: 'Procfile & Nixpacks', description: 'Deployment configuration' },
      { name: 'Flask-CORS', description: 'Cross-origin resource sharing management' },
      { name: 'Git', description: 'Version control system' },
      { name: 'npm/pip', description: 'Package management tools' }
    ]
  };
  
  // SophitTraining skills organized by category
  private sophitTrainingSkills: {[key: string]: SkillItem[]} = {
    'Core Technologies': [
      { name: 'TypeScript', description: 'Strongly-typed programming language for frontend development' },
      { name: 'React & Next.js', description: 'Frontend framework ecosystem with App Router' },
      { name: 'JSX', description: 'JavaScript extension for UI component declaration' }
    ],
    'UI & UX Tools': [
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
      { name: 'Framer Motion', description: 'Animation library for React' },
      { name: 'Responsive Design', description: 'Layout adaptation for all device sizes' },
      { name: 'Custom UI Components', description: 'Reusable interface components like expandable cards' }
    ],
    'Data Management': [
      { name: 'EmailJS', description: 'Form submission and email integration' },
      { name: 'Type Safety', description: 'Comprehensive TypeScript interfaces and type definitions' }
    ],
    'Infrastructure': [
      { name: 'Netlify', description: 'Deployment and hosting platform' },
      { name: 'Environment Variables', description: 'Configuration management' },
      { name: 'Git', description: 'Version control system' },
      { name: 'npm', description: 'Package management' }
    ]
  };

  private portfolioWebsiteSkills: {[key: string]: SkillItem[]} = {
    'Core Technologies': [
      { name: 'TypeScript', description: 'Primary programming language for type-safe development' },
      { name: 'Angular 19', description: 'Latest version of the Angular framework' },
      { name: 'RxJS', description: 'Reactive Extensions library for async operations' },
      { name: 'Angular Router', description: 'Client-side navigation and routing' },
      { name: 'Angular SSR', description: 'Server-side rendering for improved performance and SEO' }
    ],
    'UI & UX Tools': [
      { name: 'CSS Variables', description: 'Custom design system with theme variables' },
      { name: 'Angular Animations', description: 'Built-in animation system for enhanced UX' },
      { name: 'Responsive Design', description: 'Mobile-first approach with adaptive layouts' },
      { name: 'Component Architecture', description: 'Modular, reusable standalone components' },
      { name: 'SVG Integration', description: 'Vector-based icons and graphics' }
    ],
    'Data Management': [
      { name: 'Angular Services', description: 'Dependency injection for data management' },
      { name: 'Reactive State', description: 'Observable-based state management patterns' },
      { name: 'JSON Models', description: 'Strongly-typed data models with interfaces' },
      { name: 'Form Controls', description: 'Reactive forms with validation patterns' }
    ],
    'Infrastructure': [
      { name: 'Netlify', description: 'Deployment and hosting platform with CI/CD' },
      { name: 'Angular CLI', description: 'Development, testing, and build tooling' },
      { name: 'Standalone Components', description: 'Modern Angular architecture without NgModules' },
      { name: 'Lazy Loading', description: 'On-demand code loading for optimized performance' },
      { name: 'Prerendering', description: 'Static generation for specific routes' }
    ]
  };
  
  ngOnInit() {
    this.initializeSkillsForProject();
  }
  
  ngOnChanges() {
    this.initializeSkillsForProject();
  }
  
  private initializeSkillsForProject() {
    // Create a deep copy of the default categories
    this.skillCategories = JSON.parse(JSON.stringify(this.defaultSkillCategories));
    
    // Assign skills based on project ID
    if (this.projectId === 'groshme-beta') {
      this.assignSkills(this.groshmeBetaSkills);
    } else if (this.projectId === 'sophit-training') {
      this.assignSkills(this.sophitTrainingSkills);
    } else if (this.projectId === 'portfolio-website') { // Add this condition
      this.assignSkills(this.portfolioWebsiteSkills);
    }
  }
  
  private assignSkills(skillsMap: {[key: string]: SkillItem[]}) {
    this.skillCategories.forEach(category => {
      const skills = skillsMap[category.name];
      if (skills) {
        category.skills = skills;
      }
    });
  }
  
  toggleSkillsOpen() {
    this.isSkillsOpen = !this.isSkillsOpen;
    
    // If closing the skills dropdown, also close all categories
    if (!this.isSkillsOpen) {
      this.skillCategories.forEach(category => category.isOpen = false);
    }
  }
  
  toggleCategory(category: SkillCategory) {
    // Toggle the clicked category
    category.isOpen = !category.isOpen;
    
    // Close other categories
    if (category.isOpen) {
      this.skillCategories.forEach(cat => {
        if (cat !== category) {
          cat.isOpen = false;
        }
      });
    }
  }
}