import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

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
    certifications?: string[];
    queues?: string[];
    isExpanded: boolean;
    isDetailOpen: boolean;
  }
  
  interface Skill {
    name: string;
    relevance: 'high' | 'medium' | 'low';
    category: 'technical' | 'business' | 'soft';
    description: string;
  }
  
  interface Category {
    id: string;
    label: string;
  }
  
  interface SkillType {
    id: string;
    label: string;
    colorClass: string;
  }

@Component({
    selector: 'app-work-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './work-history.component.html',
    styleUrls: ['./work-history.component.css'],
    animations: [
      // Animation for expanding/collapsing content
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
      
      // Animation for fading in skills with a staggered effect
      trigger('skillsAnimation', [
        transition('* => *', [
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('80ms', [
              animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ], { optional: true })
        ])
      ]),
      
      // Animation for section elements fading in from bottom
      trigger('fadeInUp', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ]),
      
      // Animation for staggered appearance of timeline cards
      trigger('staggerFadeIn', [
        transition('* => *', [
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger('150ms', [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ], { optional: true })
        ])
      ]),
      
      // Animation for rotating the expand/collapse icon
      trigger('rotateIcon', [
        state('collapsed', style({ transform: 'rotate(0)' })),
        state('expanded', style({ transform: 'rotate(180deg)' })),
        transition('collapsed <=> expanded', [
          animate('300ms ease-out')
        ])
      ]),
      
      // Animation for the current job indicator
      trigger('pulseAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          animate('600ms 300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ])
    ]
  })

export class WorkHistoryComponent implements OnInit {
  workExperiences: WorkExperience[] = [];
  selectedCategory: string = 'all';
  selectedSkillType: string = 'technical'; // Default to technical skills
  
  categories: Category[] = [
    { id: 'all', label: 'All Experience' },
    { id: 'tech', label: 'Technology' },
    { id: 'customer-service', label: 'Customer Service' },
    { id: 'other', label: 'Other Experience' }
  ];
  
  skillTypes: SkillType[] = [
    { id: 'technical', label: 'Technical Skills', colorClass: 'filter-technical' },
    { id: 'business', label: 'Business Skills', colorClass: 'filter-business' },
    { id: 'soft', label: 'Soft Skills', colorClass: 'filter-soft' },
    { id: 'all', label: 'All Skills', colorClass: 'filter-all' }
  ];
  
  currentJobDuration: { years: number, months: number } = { years: 0, months: 0 };
  animationReady = false;
  
  ngOnInit(): void {
    this.initializeWorkExperiences();
    this.calculateCurrentJobDuration();
    
    // Delay animation start slightly to ensure DOM is ready
    setTimeout(() => {
      this.animationReady = true;
    }, 100);
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
        role: 'Product Support Specialist II',
        startDate: new Date('2024-09-16'),
        endDate: null, // Current job
        relevanceScore: 95,
        category: 'tech',
        description: 'Providing comprehensive technical support for Rent Manager Property Management Software across multiple specialized queues, including Mobile, Integrations, Technical, General, and Receivables & Payables, while troubleshooting complex software issues and ensuring optimal customer experience.',
        responsibilities: [
          'Serve as a specialized expert in the Mobile queue, assisting property managers with mobile apps, web portals, and API integration issues',
          'Lead troubleshooting for the Integrations queue, resolving complex data transfer problems between Rent Manager and third-party software systems',
          'Diagnose and fix technical issues across multiple support queues, including database structure problems, user permissions, and electronic funds transfer systems',
          'Support accountants and financial professionals in analyzing, interpreting, and troubleshooting complex financial reports and accounting workflows',
          'Guide clients on accounting best practices specific to property management, including accounts receivable/payable processes and financial reconciliation',
          'Set up and customize Rent Manager web-based portals, leveraging web development knowledge to optimize functionality',
          'Collaborate with internal development teams to identify and resolve software bugs and unexpected behaviors',
          'Configure and optimize automated workflow processes to streamline property management operations',
          'Provide guidance on regulatory compliance and industry-standard accounting practices for property management',
          'Document detailed solution steps in ticketing software to build the knowledge base and improve resolution efficiency'
        ],
        skills: [
          // Technical Skills
          { name: 'Technical Troubleshooting', relevance: 'high', category: 'technical', description: 'Advanced systematic identification and resolution of complex multi-layered software issues' },
          { name: 'Web Portal Configuration', relevance: 'high', category: 'technical', description: 'Setting up, customizing, and optimizing web-based portals using front-end development knowledge' },
          { name: 'API Integration', relevance: 'high', category: 'technical', description: 'Diagnosing issues with data transfer between Rent Manager and third-party services via APIs' },
          { name: 'Database Structure', relevance: 'high', category: 'technical', description: 'Understanding and resolving issues related to complex database architectures and data relationships' },
          { name: 'Remote Support Tools', relevance: 'high', category: 'technical', description: 'Expert use of remote desktop and diagnostic software to troubleshoot client-side issues efficiently' },
          { name: 'Electronic Funds Transfer', relevance: 'high', category: 'technical', description: 'Troubleshooting and optimizing payment processing and financial data transfers' },
          { name: 'User Permissions Systems', relevance: 'high', category: 'technical', description: 'Configuring and troubleshooting complex role-based access control systems' },
          { name: 'Mobile Application Support', relevance: 'high', category: 'technical', description: 'Resolving platform-specific issues across iOS and Android mobile applications' },
          { name: 'Technical Documentation', relevance: 'high', category: 'technical', description: 'Creating comprehensive solution documentation for complex technical issues' },
          { name: 'Software Integration', relevance: 'high', category: 'technical', description: 'Diagnosing and resolving integration issues between multiple software systems' },
          
          // Business Skills
          { name: 'Financial Report Analysis', relevance: 'high', category: 'business', description: 'Interpreting and troubleshooting financial reports including balance sheets, income statements, and cash flow reports specific to property management' },
          { name: 'Accounts Receivable/Payable', relevance: 'high', category: 'business', description: 'Supporting clients with billing cycles, payment application, vendor management, and invoice processing workflows' },
          { name: 'Property Management Operations', relevance: 'high', category: 'business', description: 'Understanding the core business processes of property management companies and optimizing software to support these operations' },
          { name: 'Workflow Optimization', relevance: 'high', category: 'business', description: 'Configuring and troubleshooting automated business processes to improve operational efficiency' },
          { name: 'Accounting Principles', relevance: 'high', category: 'business', description: 'Applying accounting best practices to property management scenarios and helping clients maintain accurate financial records' },
          { name: 'Financial Reconciliation', relevance: 'high', category: 'business', description: 'Assisting with bank reconciliation processes, ledger balancing, and resolving discrepancies in financial records' },
          { name: 'Regulatory Compliance', relevance: 'medium', category: 'business', description: 'Advising on software configuration to help meet industry regulations and financial reporting requirements' },
          { name: 'Budget Management', relevance: 'medium', category: 'business', description: 'Supporting property management companies with budget creation, tracking, and variance analysis' },
          
          // Soft Skills
          { name: 'Problem Solving', relevance: 'high', category: 'soft', description: 'Applying critical thinking and systematic approaches to resolve complex technical challenges' },
          { name: 'Customer Communication', relevance: 'high', category: 'soft', description: 'Translating technical concepts into clear explanations for users with varying technical backgrounds' },
          { name: 'Technical Empathy', relevance: 'high', category: 'soft', description: 'Understanding client pain points and frustrations with technology to provide supportive and effective assistance' },
          { name: 'Process Analysis', relevance: 'high', category: 'soft', description: 'Identifying inefficiencies in workflows and recommending improvements to business processes' },
          { name: 'Training & Knowledge Transfer', relevance: 'medium', category: 'soft', description: 'Effectively teaching clients how to use complex software features and troubleshoot common issues' }
        ],
        locations: ['Cincinnati, OH (Hybrid - 50% Remote)'],
        certifications: [
          'Rent Manager Mobile Queue Certification',
          'Rent Manager General Queue Certification',
          'Rent Manager Receivables & Payables Certification',
          'Rent Manager Technical Queue Certification'
        ],
        queues: [
          'Mobile Apps & Web Portals',
          'Integrations & Third-Party Software',
          'Technical Support',
          'General Support',
          'Receivables & Payables'
        ],
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
          // Soft Skills
          { name: 'Customer Service', relevance: 'high', category: 'soft', description: 'Managing customer expectations and providing exceptional service under pressure' },
          { name: 'Problem Resolution', relevance: 'high', category: 'soft', description: 'Quickly addressing customer concerns with effective solutions' },
          { name: 'Team Training', relevance: 'medium', category: 'soft', description: 'Onboarding and mentoring new team members on processes and procedures' },
          { name: 'Time Management', relevance: 'high', category: 'soft', description: 'Prioritizing tasks effectively in a fast-paced environment with competing demands' },
          { name: 'Attention to Detail', relevance: 'medium', category: 'soft', description: 'Maintaining accuracy while working under pressure' },
          
          // Business Skills
          { name: 'Inventory Management', relevance: 'medium', category: 'business', description: 'Tracking stock levels, identifying usage patterns, and ensuring adequate supplies' },
          { name: 'Cash Handling', relevance: 'medium', category: 'business', description: 'Processing transactions accurately and maintaining balanced accounts' },
          
          // Technical Skills
          { name: 'POS System Operation', relevance: 'medium', category: 'technical', description: 'Efficiently using point-of-sale software for order processing and payment handling' }
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
          // Soft Skills
          { name: 'Client Relationship Management', relevance: 'high', category: 'soft', description: 'Building and maintaining relationships with high-value customers' },
          { name: 'Conflict Resolution', relevance: 'medium', category: 'soft', description: 'Diplomatically addressing and resolving customer complaints' },
          { name: 'Attention to Detail', relevance: 'medium', category: 'soft', description: 'Remembering specific customer preferences to enhance personalized service' },
          { name: 'Professional Communication', relevance: 'high', category: 'soft', description: 'Maintaining appropriate, professional interactions with exclusive clientele' },
          
          // Business Skills
          { name: 'High-End Service Standards', relevance: 'high', category: 'business', description: 'Adhering to premium service protocols expected at exclusive establishments' },
          { name: 'Club Operations', relevance: 'medium', category: 'business', description: 'Understanding the business operations of a membership-based organization' }
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
          // Soft Skills
          { name: 'Team Leadership', relevance: 'high', category: 'soft', description: 'Directing and motivating teams to achieve project goals' },
          { name: 'Cross-cultural Communication', relevance: 'medium', category: 'soft', description: 'Overcoming language barriers through alternative communication methods' },
          
          // Business Skills
          { name: 'Project Management', relevance: 'high', category: 'business', description: 'Planning and executing projects within timeline and quality constraints' },
          { name: 'Client Management', relevance: 'high', category: 'business', description: 'Understanding client requirements and ensuring satisfaction' },
          { name: 'Resource Planning', relevance: 'medium', category: 'business', description: 'Managing inventory and planning resource allocation' },
          { name: 'Service Quality Control', relevance: 'medium', category: 'business', description: 'Implementing and maintaining high standards for service delivery' },
          
          // Technical Skills
          { name: 'Site Assessment', relevance: 'medium', category: 'technical', description: 'Evaluating locations and determining optimal approaches to projects' }
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
  
  filterBySkillType(skillType: string): void {
    this.selectedSkillType = skillType;
  }
  
  get filteredExperiences(): WorkExperience[] {
    return this.selectedCategory === 'all' 
      ? this.workExperiences 
      : this.workExperiences.filter(exp => exp.category === this.selectedCategory);
  }
  
  // Filter skills based on selected skill type
  getFilteredSkills(experience: WorkExperience): Skill[] {
    if (this.selectedSkillType === 'all') {
      return experience.skills;
    }
    return experience.skills.filter(skill => skill.category === this.selectedSkillType);
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
      case 'business': return 'skill-business';
      case 'soft': return 'skill-soft';
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