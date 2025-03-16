import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-work-history-skills-dropdown',
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
        <span>Attributable Skills: {{getSkillSummary()}}</span>
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
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .skills-trigger {
      color: var(--gray, #95a5a6);
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 6px 0;
      transition: all 0.2s ease;
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
      padding-top: 10px;
      padding-bottom: 10px;
      animation: fadeIn 0.3s ease-out;
    }
    
    .category-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .category-button {
      background-color: var(--light);
      border: 1px solid var(--light-gray);
      border-radius: 20px;
      padding: 6px 12px;
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
      margin-bottom: 5px;
    }
    
    .category-description {
      color: var(--gray);
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 8px;
      padding-left: 8px;
      border-left: 2px solid var(--primary);
    }
    
    .skills-list {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    
    .skill-item {
      margin-bottom: 8px;
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
export class WorkHistorySkillsDropdownComponent implements OnInit {
  @Input() jobId: string = '';
  
  isSkillsOpen: boolean = false;
  skillCategories: SkillCategory[] = [];
  
  // Default skill categories structure
  private defaultSkillCategories: SkillCategory[] = [
    {
      name: 'Technical',
      description: 'Hard skills and technical abilities related to this role',
      skills: [],
      isOpen: false
    },
    {
      name: 'Business',
      description: 'Professional skills related to business operations and management',
      skills: [],
      isOpen: false
    },
    {
      name: 'Soft',
      description: 'Interpersonal and communication skills developed in this role',
      skills: [],
      isOpen: false
    }
  ];
  
  // London Computer Systems (LCS) skills
  private lcsSkills: {[key: string]: SkillItem[]} = {
    'Technical': [
      { name: 'Technical Troubleshooting', description: 'Advanced systematic identification and resolution of complex multi-layered software issues' },
      { name: 'Web Portal Configuration', description: 'Setting up, customizing, and optimizing web-based portals using front-end development knowledge' },
      { name: 'API Integration', description: 'Diagnosing issues with data transfer between Rent Manager and third-party services via APIs' },
      { name: 'Database Structure', description: 'Understanding and resolving issues related to complex database architectures and data relationships' },
      { name: 'Remote Support Tools', description: 'Expert use of remote desktop and diagnostic software to troubleshoot client-side issues efficiently' },
      { name: 'Electronic Funds Transfer', description: 'Troubleshooting and optimizing payment processing and financial data transfers' }
    ],
    'Business': [
      { name: 'Financial Report Analysis', description: 'Interpreting and troubleshooting financial reports including balance sheets, income statements, and cash flow reports' },
      { name: 'Accounts Receivable/Payable', description: 'Supporting clients with billing cycles, payment application, vendor management, and invoice processing workflows' },
      { name: 'Property Management Operations', description: 'Understanding the core business processes of property management companies and optimizing software to support these operations' },
      { name: 'Workflow Optimization', description: 'Configuring and troubleshooting automated business processes to improve operational efficiency' },
      { name: 'Accounting Principles', description: 'Applying accounting best practices to property management scenarios and helping clients maintain accurate financial records' }
    ],
    'Soft': [
      { name: 'Problem Solving', description: 'Applying critical thinking and systematic approaches to resolve complex technical challenges' },
      { name: 'Customer Communication', description: 'Translating technical concepts into clear explanations for users with varying technical backgrounds' },
      { name: 'Technical Empathy', description: 'Understanding client pain points and frustrations with technology to provide supportive and effective assistance' },
      { name: 'Process Analysis', description: 'Identifying inefficiencies in workflows and recommending improvements to business processes' },
      { name: 'Training & Knowledge Transfer', description: 'Effectively teaching clients how to use complex software features and troubleshoot common issues' }
    ]
  };
  
  // Midway/Good Night John Boy skills
  private bartenderSkills: {[key: string]: SkillItem[]} = {
    'Technical': [
      { name: 'POS System Operation', description: 'Efficiently using point-of-sale software for order processing and payment handling' }
    ],
    'Business': [
      { name: 'Inventory Management', description: 'Tracking stock levels, identifying usage patterns, and ensuring adequate supplies' },
      { name: 'Cash Handling', description: 'Processing transactions accurately and maintaining balanced accounts' },
      { name: 'Product Knowledge', description: 'Maintaining comprehensive understanding of beverage offerings, ingredients, and preparation methods' },
      { name: 'Sales Optimization', description: 'Implementing upselling techniques to increase average transaction value while ensuring customer satisfaction' },
      { name: 'Quality Control', description: 'Maintaining consistent product standards through proper measurement, preparation, and presentation' }
    ],
    'Soft': [
      { name: 'Customer Service', description: 'Managing customer expectations and providing exceptional service under pressure' },
      { name: 'Problem Resolution', description: 'Quickly addressing customer concerns with effective solutions' },
      { name: 'Team Training', description: 'Onboarding and mentoring new team members on processes and procedures' },
      { name: 'Time Management', description: 'Prioritizing tasks effectively in a fast-paced environment with competing demands' },
      { name: 'Attention to Detail', description: 'Maintaining accuracy while working under pressure' }
    ]
  };
  
  // Perrino Landscape Inc. skills
  private perrinoSkills: {[key: string]: SkillItem[]} = {
    'Technical': [
      { name: 'Site Assessment', description: 'Evaluating locations and determining optimal approaches to projects' }
    ],
    'Business': [
      { name: 'Project Management', description: 'Planning and executing projects within timeline and quality constraints' },
      { name: 'Client Management', description: 'Understanding client requirements and ensuring satisfaction' },
      { name: 'Resource Planning', description: 'Managing inventory and planning resource allocation' },
      { name: 'Service Quality Control', description: 'Implementing and maintaining high standards for service delivery' }
    ],
    'Soft': [
      { name: 'Team Leadership', description: 'Directing and motivating teams to achieve project goals' },
      { name: 'Cross-cultural Communication', description: 'Overcoming language barriers through alternative communication methods' }
    ]
  };
  
  ngOnInit() {
    this.initializeSkillsForJob();
  }
  
  ngOnChanges() {
    this.initializeSkillsForJob();
  }
  
  private initializeSkillsForJob() {
    // Create a deep copy of the default categories
    this.skillCategories = JSON.parse(JSON.stringify(this.defaultSkillCategories));
    
    // Assign skills based on job ID
    if (this.jobId === 'lcs') {
      this.assignSkills(this.lcsSkills);
    } else if (this.jobId === 'midway-gnb') {
      this.assignSkills(this.bartenderSkills);
    } else if (this.jobId === 'perrino') {
      this.assignSkills(this.perrinoSkills);
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
  
  // Get a summary of skills to display in the collapsed view
  getSkillSummary(): string {
    let allSkills: string[] = [];
    this.skillCategories.forEach(category => {
      const skillNames = category.skills.map(skill => skill.name);
      allSkills = allSkills.concat(skillNames);
    });
    
    // Get top 3 skills to show in summary
    const topSkills = allSkills.slice(0, 3);
    return topSkills.join(', ') + (allSkills.length > 3 ? ', ...' : '');
  }
}