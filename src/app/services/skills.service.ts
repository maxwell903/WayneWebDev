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
      proficiency: 95, 
      category: 'Frontend',
      years: 3,
      description: 'Advanced experience with Angular 19+, RxJS, state management, and standalone components',
      projects: ['Portfolio Website', 'GroshmeBeta']
    },
    { 
      name: 'React', 
      proficiency: 90, 
      category: 'Frontend',
      years: 3,
      description: 'Component architecture, hooks, Next.js, state management with Redux & Context API',
      projects: ['SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'TypeScript', 
      proficiency: 92, 
      category: 'Languages',
      years: 4,
      description: 'Advanced typing, interfaces, generics, utility types, and design patterns',
      projects: ['Portfolio Website', 'SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'Java', 
      proficiency: 85, 
      category: 'Languages',
      years: 3,
      description: 'Object-oriented programming, enterprise applications, Spring framework, Android development',
      projects: ['University Projects', 'Personal Development']
    },
    { 
      name: 'HTML', 
      proficiency: 95, 
      category: 'Frontend',
      years: 5,
      description: 'Semantic HTML5, accessibility, best practices, structured documents',
      projects: ['Portfolio Website', 'SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'CSS', 
      proficiency: 93, 
      category: 'Frontend',
      years: 5,
      description: 'CSS3, SCSS, responsive design, animations, Flexbox, Grid, media queries',
      projects: ['Portfolio Website', 'SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'Tailwind CSS', 
      proficiency: 88, 
      category: 'Frontend',
      years: 2,
      description: 'Utility-first CSS framework, responsive designs, customization',
      projects: ['SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'Framer Motion', 
      proficiency: 80, 
      category: 'Frontend',
      years: 1,
      description: 'Animation library for React, interactive UI components, transitions',
      projects: ['SophitTraining']
    },
    
    // Backend Skills
    { 
      name: 'Node.js', 
      proficiency: 85, 
      category: 'Backend',
      years: 3,
      description: 'RESTful APIs, Express, middleware, authentication, server-side rendering',
      projects: ['GroshmeBeta', 'Portfolio Website']
    },
    { 
      name: 'Python', 
      proficiency: 80, 
      category: 'Backend',
      years: 2,
      description: 'Flask framework, API development, data processing',
      projects: ['GroshmeBeta']
    },
    { 
      name: 'Flask', 
      proficiency: 78, 
      category: 'Backend',
      years: 2,
      description: 'Python web framework, RESTful API design, authentication, database integration',
      projects: ['GroshmeBeta']
    },
    
    // Database Skills
    { 
      name: 'MongoDB', 
      proficiency: 82, 
      category: 'Database',
      years: 3,
      description: 'Schema design, queries, aggregation, Mongoose ODM, performance optimization',
      projects: ['GroshmeBeta']
    },
    { 
      name: 'PostgreSQL', 
      proficiency: 85, 
      category: 'Database',
      years: 3,
      description: 'Relational database design, complex queries, indexing, performance tuning',
      projects: ['GroshmeBeta']
    },
    { 
      name: 'Supabase', 
      proficiency: 80, 
      category: 'Database',
      years: 1,
      description: 'Backend-as-a-service, authentication, real-time subscriptions, storage',
      projects: ['GroshmeBeta']
    },
    { 
      name: 'SQL', 
      proficiency: 88, 
      category: 'Database',
      years: 4,
      description: 'Advanced querying, database optimization, data modeling',
      projects: ['Database course project', 'GroshmeBeta']
    },
    
    // DevOps/Tools
    { 
      name: 'Git/GitHub', 
      proficiency: 92, 
      category: 'DevOps',
      years: 5,
      description: 'Version control, branching strategies, PRs, code reviews, CI/CD integration',
      projects: ['Portfolio Website', 'SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'Netlify', 
      proficiency: 90, 
      category: 'DevOps',
      years: 3,
      description: 'Deployment automation, serverless functions, forms handling, domain management',
      projects: ['Portfolio Website', 'SophitTraining', 'GroshmeBeta']
    },
    { 
      name: 'Testing', 
      proficiency: 85, 
      category: 'Quality Assurance',
      years: 3,
      description: 'Jest, Jasmine, unit testing, integration testing, component testing',
      projects: ['Portfolio Website', 'GroshmeBeta']
    },
    { 
      name: 'SSR', 
      proficiency: 85, 
      category: 'Performance',
      years: 2,
      description: 'Server-side rendering with Angular and Next.js, SEO optimization',
      projects: ['Portfolio Website', 'SophitTraining']
    },
    
    // Legacy Systems
    { 
      name: 'COBOL', 
      proficiency: 70, 
      category: 'Legacy Systems',
      years: 2,
      description: 'Enterprise mainframe development, business logic implementation, legacy system maintenance',
      projects: ['Financial System Integration', 'Legacy Modernization']
    },
    
    // Business/Analysis
    { 
      name: 'Business Analysis', 
      proficiency: 88, 
      category: 'Business',
      years: 4,
      description: 'Requirements gathering, process modeling, stakeholder management, solution design',
      projects: ['MIS Capstone Project', 'GroshmeBeta']
    },
    { 
      name: 'Project Management', 
      proficiency: 85, 
      category: 'Business',
      years: 3,
      description: 'Agile/Scrum methodologies, sprint planning, backlog management, team coordination',
      projects: ['Team Project Management Course', 'GroshmeBeta']
    },
    { 
      name: 'UI/UX Design', 
      proficiency: 83, 
      category: 'Design',
      years: 2,
      description: 'User experience principles, wireframing, prototyping, design systems',
      projects: ['SophitTraining', 'Portfolio Website']
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