import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: Skill[] = [
    // Frontend Skills
    { 
      name: 'Angular', 
      proficiency: 90, 
      category: 'Frontend',
      years: 3,
      description: 'Experience with Angular 12+, RxJS, NgRx, and Angular Material',
      projects: ['Large Netlify Project']
    },
    { 
      name: 'React', 
      proficiency: 85, 
      category: 'Frontend',
      years: 2,
      description: 'Building components, hooks, and state management with Redux',
      projects: ['Small Netlify Project']
    },
    { 
      name: 'TypeScript', 
      proficiency: 85, 
      category: 'Languages',
      years: 3,
      description: 'Strong typing, interfaces, generics, and advanced patterns',
      projects: ['Large Netlify Project', 'Small Netlify Project']
    },
    { 
      name: 'HTML/CSS', 
      proficiency: 90, 
      category: 'Frontend',
      years: 4,
      description: 'Semantic HTML5, CSS3, SCSS, responsive design, accessibility',
      projects: ['Large Netlify Project', 'Small Netlify Project']
    },
    
    // Backend Skills
    { 
      name: 'Node.js', 
      proficiency: 80, 
      category: 'Backend',
      years: 2,
      description: 'RESTful APIs, Express, middleware, authentication',
      projects: ['Large Netlify Project']
    },
    { 
      name: 'MongoDB', 
      proficiency: 75, 
      category: 'Database',
      years: 2,
      description: 'Schema design, queries, aggregation, Mongoose ODM',
      projects: ['Large Netlify Project']
    },
    { 
      name: 'SQL', 
      proficiency: 85, 
      category: 'Database',
      years: 3,
      description: 'Schema design, complex queries, optimization',
      projects: ['Database course project']
    },
    
    // DevOps/Tools
    { 
      name: 'Git/GitHub', 
      proficiency: 90, 
      category: 'DevOps',
      years: 4,
      description: 'Version control, branching strategies, PRs, code reviews',
      projects: ['Large Netlify Project', 'Small Netlify Project']
    },
    { 
      name: 'Netlify', 
      proficiency: 85, 
      category: 'DevOps',
      years: 2,
      description: 'Continuous deployment, serverless functions, forms',
      projects: ['Large Netlify Project', 'Small Netlify Project']
    },
    { 
      name: 'Unit Testing', 
      proficiency: 80, 
      category: 'Testing',
      years: 2,
      description: 'Jest, Jasmine, testing strategies',
      projects: ['Large Netlify Project']
    },
    
    // Business/Analysis
    { 
      name: 'Business Analysis', 
      proficiency: 85, 
      category: 'Business',
      years: 3,
      description: 'Requirements gathering, process modeling, stakeholder management',
      projects: ['MIS Capstone Project']
    },
    { 
      name: 'Project Management', 
      proficiency: 80, 
      category: 'Business',
      years: 2,
      description: 'Agile/Scrum, sprint planning, backlog management',
      projects: ['Team Project Management Course']
    }
  ];

  getAllSkills(): Skill[] {
    return this.skills;
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getCategories(): string[] {
    const categories = new Set(this.skills.map(skill => skill.category));
    return Array.from(categories);
  }
}
