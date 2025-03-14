// src/app/pages/work-history/work-history.component.ts
// This component should be placed in src/app/pages/work-history/work-history.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: Date;
  endDate: Date | null;
  relevanceScore: number;
  category: 'tech' | 'customer-service' | 'other';
  description: string;
  responsibilities: string[];
  skills: Skill[];
  locations?: string[];
  isExpanded: boolean;
  isDetailOpen: boolean;
}

interface Skill {
  name: string;
  relevance: 'high' | 'medium' | 'low';
  category: 'technical' | 'soft' | 'domain';
  description: string;
}

@Component({
  selector: 'app-work-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0,
        padding: '0 20px'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        padding: '20px'
      })),
      transition('collapsed <=> expanded', [
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('skillAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Removed fadeSlideIn animation that was causing cards to disappear
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class WorkHistoryComponent implements OnInit {
  workExperiences: WorkExperience[] = [];
  selectedCategory: string = 'all';
  categories = [
    { id: 'all', label: 'All Experience' },
    { id: 'tech', label: 'Technology' },
    { id: 'customer-service', label: 'Customer Service' },
    { id: 'other', label: 'Other Experience' }
  ];
  currentJobDuration: { years: number, months: number } = { years: 0, months: 0 };
  
  ngOnInit(): void {
    this.initializeWorkExperiences();
    this.calculateCurrentJobDuration();
  }
  
  calculateCurrentJobDuration(): void {
    const currentJob = this.workExperiences.find(job => job.id === 'lcs');
    if (currentJob && !currentJob.endDate) {
      const startDate = currentJob.startDate;
      const currentDate = new Date();
      
      // Calculate total months between dates
      const totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                         (currentDate.getMonth() - startDate.getMonth());
      
      // Convert to years and months
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      
      this.currentJobDuration = { years, months };
    }
  }
  
  initializeWorkExperiences(): void {
    this.workExperiences = [
      {
        id: 'lcs',
        company: 'London Computer Systems (LCS)',
        role: 'Technical Support Specialist',
        startDate: new Date('2024-09-16'),
        endDate: null, // Current job
        relevanceScore: 95,
        category: 'tech',
        description: 'Providing expert technical support for Rent Manager Property Management Software, resolving customer issues, and ensuring optimal software performance in a hybrid work environment.',
        responsibilities: [
          'Provide guidance and best practices to users utilizing Rent Manager property management software',
          'Deliver superior customer service over phone and email',
          'Assist customers with software issues including printing problems, installation, and general troubleshooting',
          'Conduct remote sessions with customers to resolve software issues',
          'Document and track all issues in ticketing software',
          'Collaborate with internal departments to improve processes and customer satisfaction'
        ],
        skills: [
          { name: 'Technical Troubleshooting', relevance: 'high', category: 'technical', description: 'Identifying and resolving complex software issues through systematic analysis' },
          { name: 'Remote Support Tools', relevance: 'high', category: 'technical', description: 'Using remote desktop software to diagnose and fix client problems' },
          { name: 'Customer Communication', relevance: 'high', category: 'soft', description: 'Explaining technical concepts clearly to non-technical users' },
          { name: 'Software Documentation', relevance: 'high', category: 'technical', description: 'Creating detailed records of issues and solutions in ticketing systems' },
          { name: 'Network Fundamentals', relevance: 'medium', category: 'technical', description: 'Understanding WAN/LAN concepts to troubleshoot connectivity issues' },
          { name: 'Problem Solving', relevance: 'high', category: 'soft', description: 'Applying critical thinking to resolve complex technical challenges' }
        ],
        locations: ['Cincinnati, OH'],
        isExpanded: false,
        isDetailOpen: false
      },
      {
        id: 'midway-gnb',
        company: 'Midway/Good Night John Boy',
        role: 'Bartender/Barback',
        startDate: new Date('2020-10-01'),
        endDate: new Date('2024-05-30'),
        relevanceScore: 75,
        category: 'customer-service',
        description: 'Managed high-volume customer orders and delivered exceptional service in a fast-paced environment, while training new staff members and maintaining bar operations.',
        responsibilities: [
          'Efficiently managed high-volume customer orders during peak hours',
          'Delivered excellent customer service, resolving issues and enhancing the guest experience',
          'Trained and mentored new staff members on bar procedures and drink preparation',
          'Multitasked managing multiple drink orders, customer interactions, and bar upkeep simultaneously'
        ],
        skills: [
          { name: 'Customer Service', relevance: 'high', category: 'soft', description: 'Managing customer expectations and providing exceptional service under pressure' },
          { name: 'Problem Resolution', relevance: 'high', category: 'soft', description: 'Quickly addressing customer concerns with effective solutions' },
          { name: 'Team Training', relevance: 'medium', category: 'soft', description: 'Onboarding and mentoring new team members on processes and procedures' },
          { name: 'Time Management', relevance: 'high', category: 'soft', description: 'Prioritizing tasks effectively in a fast-paced environment with competing demands' },
          { name: 'Attention to Detail', relevance: 'medium', category: 'soft', description: 'Maintaining accuracy while working under pressure' }
        ],
        isExpanded: false,
        isDetailOpen: false
      },
      {
        id: 'muirfield',
        company: 'Muirfield Golf Club',
        role: 'Server',
        startDate: new Date('2021-04-01'),
        endDate: new Date('2021-08-31'),
        relevanceScore: 65,
        category: 'customer-service',
        description: 'Provided exceptional service to an exclusive clientele at a prestigious golf club, focusing on personalized experiences and maintaining high standards.',
        responsibilities: [
          'Provided exceptional service to discerning clientele ensuring a luxury experience',
          'Fostered positive relationships with members and guests, remembering preferences for personalized service',
          'Resolved guest issues and complaints effectively while upholding club standards'
        ],
        skills: [
          { name: 'Client Relationship Management', relevance: 'high', category: 'soft', description: 'Building and maintaining relationships with high-value customers' },
          { name: 'Conflict Resolution', relevance: 'medium', category: 'soft', description: 'Diplomatically addressing and resolving customer complaints' },
          { name: 'Attention to Detail', relevance: 'medium', category: 'soft', description: 'Remembering specific customer preferences to enhance personalized service' },
          { name: 'Professional Communication', relevance: 'high', category: 'soft', description: 'Maintaining appropriate, professional interactions with exclusive clientele' }
        ],
        isExpanded: false,
        isDetailOpen: false
      },
      {
        id: 'perrino',
        company: 'Perrino Landscape Inc.',
        role: 'Foreman (Seasonal)',
        startDate: new Date('2019-05-01'),
        endDate: new Date('2022-08-31'),
        relevanceScore: 60,
        category: 'other',
        description: 'Led and supervised landscape teams while managing projects, schedules, and client relationships during seasonal work spanning multiple years.',
        responsibilities: [
          'Led and supervised teams of 3-6 individuals, ensuring productivity and adherence to project timelines',
          'Communicated effectively with team members with limited English, utilizing multilingual and non-verbal methods',
          'Managed project schedules and maintained inventory of tools and supplies',
          'Liaised with clients to understand needs, performed site inspections, and ensured high service standards'
        ],
        skills: [
          { name: 'Team Leadership', relevance: 'high', category: 'soft', description: 'Directing and motivating teams to achieve project goals' },
          { name: 'Cross-cultural Communication', relevance: 'medium', category: 'soft', description: 'Overcoming language barriers through alternative communication methods' },
          { name: 'Project Management', relevance: 'high', category: 'domain', description: 'Planning and executing projects within timeline and quality constraints' },
          { name: 'Client Management', relevance: 'high', category: 'soft', description: 'Understanding client requirements and ensuring satisfaction' },
          { name: 'Resource Planning', relevance: 'medium', category: 'domain', description: 'Managing inventory and planning resource allocation' }
        ],
        isExpanded: false,
        isDetailOpen: false
      }
    ];
    
    // Sort experiences by relevance score (highest first)
    this.workExperiences.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  toggleExpand(experience: WorkExperience): void {
    experience.isExpanded = !experience.isExpanded;
  }
  
  toggleDetails(experience: WorkExperience, event: Event): void {
    event.stopPropagation(); // Prevent triggering parent click events
    experience.isDetailOpen = !experience.isDetailOpen;
  }
  
  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
  
  get filteredExperiences(): WorkExperience[] {
    return this.selectedCategory === 'all' 
      ? this.workExperiences 
      : this.workExperiences.filter(exp => exp.category === this.selectedCategory);
  }
  
  getSkillLevelClass(relevance: string): string {
    switch(relevance) {
      case 'high': return 'skill-level-high';
      case 'medium': return 'skill-level-medium';
      case 'low': return 'skill-level-low';
      default: return '';
    }
  }
  
  getSkillCategoryClass(category: string): string {
    switch(category) {
      case 'technical': return 'skill-technical';
      case 'soft': return 'skill-soft';
      case 'domain': return 'skill-domain';
      default: return '';
    }
  }
  
  formatDate(date: Date | null): string {
    if (!date) return 'Present';
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  calculateDuration(startDate: Date, endDate: Date | null): string {
    const end = endDate ? endDate : new Date();
    const diffYears = end.getFullYear() - startDate.getFullYear();
    const diffMonths = end.getMonth() - startDate.getMonth();
    
    let months = diffMonths;
    let years = diffYears;
    
    if (diffMonths < 0) {
      months = 12 + diffMonths;
      years--;
    }
    
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''} ${months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : ''}`;
    } else {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
  }
}