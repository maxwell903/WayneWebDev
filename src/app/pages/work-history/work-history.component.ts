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
  isOverlap?: boolean;
  topOffset?: number;
  timelinePosition?: number; // Position on the timeline (percentage)
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

interface YearMarker {
  year: number;
  position: number; // Position on the timeline (percentage)
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
  timelineYears: YearMarker[] = [];
  
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
  earliestDate: Date | null = null;
  latestDate: Date | null = null;
  
  ngOnInit(): void {
    this.initializeWorkExperiences();
    this.calculateCurrentJobDuration();
    this.orderByEndDate();
    this.findDateRanges();
    this.calculateTimelinePositions();
    this.generateYearMarkers();
    this.detectOverlappingExperiences();
    
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
  
  // Order the timeline entries by end date (latest first)
  orderByEndDate(): void {
    this.workExperiences.sort((a, b) => {
      // Current job (null end date) should always be first
      if (a.endDate === null) return -1;
      if (b.endDate === null) return 1;
      
      // Otherwise sort by most recent end date
      return b.endDate.getTime() - a.endDate.getTime();
    });
  }
  
  // Find the earliest and latest dates in the timeline
  findDateRanges(): void {
    if (this.workExperiences.length === 0) return;
    
    // Find earliest start date
    this.earliestDate = this.workExperiences.reduce((earliest, job) => {
      if (!earliest || job.startDate < earliest) {
        return job.startDate;
      }
      return earliest;
    }, null as Date | null);
    
    // Find latest end date (using current date for ongoing jobs)
    const currentDate = new Date();
    this.latestDate = this.workExperiences.reduce((latest, job) => {
      const endDate = job.endDate || currentDate;
      if (!latest || endDate > latest) {
        return endDate;
      }
      return latest;
    }, null as Date | null);
  }
  
  // Calculate position on the timeline for each experience (as percentage)
  calculateTimelinePositions(): void {
    if (!this.earliestDate || !this.latestDate) return;
    
    const timelineStart = this.earliestDate.getTime();
    const timelineEnd = this.latestDate.getTime();
    const timelineRange = timelineEnd - timelineStart;
    
    this.workExperiences.forEach(job => {
      const startPosition = ((job.startDate.getTime() - timelineStart) / timelineRange) * 100;
      const endPosition = (((job.endDate || new Date()).getTime() - timelineStart) / timelineRange) * 100;
      
      // Store the middle position for placing the experience on the timeline
      job.timelinePosition = (startPosition + endPosition) / 2;
    });
  }
  
  // Generate year markers for the timeline
  generateYearMarkers(): void {
    if (!this.earliestDate || !this.latestDate) return;
    
    const startYear = this.earliestDate.getFullYear();
    const endYear = this.latestDate.getFullYear();
    const timelineStart = this.earliestDate.getTime();
    const timelineEnd = this.latestDate.getTime();
    const timelineRange = timelineEnd - timelineStart;
    
    // Create a marker for each year
    for (let year = startYear; year <= endYear; year++) {
      const yearDate = new Date(year, 0, 1); // January 1st of the year
      const position = ((yearDate.getTime() - timelineStart) / timelineRange) * 100;
      
      // Only add if position is between 0 and 100
      if (position >= 0 && position <= 100) {
        this.timelineYears.push({ year, position });
      }
    }
  }
  
  // Detect and handle overlapping job periods
  detectOverlappingExperiences(): void {
    const sortedJobs = [...this.workExperiences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    
    for (let i = 0; i < sortedJobs.length - 1; i++) {
      const jobA = sortedJobs[i];
      
      for (let j = i + 1; j < sortedJobs.length; j++) {
        const jobB = sortedJobs[j];
        
        // Calculate if jobs overlap
        const jobAEnd = jobA.endDate || new Date();
        const jobBStart = jobB.startDate;
        
        if (jobBStart < jobAEnd) {
          // Jobs overlap
          jobB.isOverlap = true;
          
          // Apply a vertical offset to the second job
          // This is a simple approach - for more complex layouts, you might need
          // a more sophisticated algorithm to handle multiple overlaps
          jobB.topOffset = 20 * j;
        }
      }
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
        id: 'osu-golf',
        company: 'The Ohio State University Golf Course',
        role: 'Grounds Keeper',
        startDate: new Date('2023-05-01'),
        endDate: new Date('2023-09-30'),
        relevanceScore: 55,
        category: 'other',
        description: 'Maintained championship-caliber golf course conditions through comprehensive turf management, landscape maintenance, and tournament preparation, ensuring exceptional playing conditions for OSU Golf Club members and guests.',
        responsibilities: [
          'Performed daily course setup including pin placement, tee marker positioning, and course marking according to USGA standards',
          'Operated specialized turf maintenance equipment including mowers, aerators, sprayers, and utility vehicles',
          'Conducted irrigation system maintenance and monitoring to ensure optimal turf health during summer months',
          'Implemented pest management protocols to identify and address disease, insect, and weed issues',
          'Assisted in tournament preparation and special event setup for collegiate and member competitions',
          'Executed detailed bunker maintenance including edging, raking, and sand conditioning',
          'Collaborated with the grounds team to complete projects efficiently during early morning hours'
        ],
        skills: [
          // Technical Skills
          { name: 'Turf Management Systems', relevance: 'medium', category: 'technical', description: 'Operating computerized irrigation systems and monitoring software to maintain optimal soil moisture levels' },
          { name: 'Equipment Operation', relevance: 'high', category: 'technical', description: 'Safely operating specialized groundskeeping machinery including precision mowers, aerators, and utility vehicles' },
          { name: 'Landscape Maintenance', relevance: 'high', category: 'technical', description: 'Applying horticultural techniques for turf, trees, and ornamental plantings in a high-standards environment' },
          { name: 'Environmental Monitoring', relevance: 'medium', category: 'technical', description: 'Using digital tools to track soil conditions, weather impacts, and turf health metrics' },
          
          // Business Skills
          { name: 'Resource Management', relevance: 'medium', category: 'business', description: 'Efficiently utilizing water, fertilizer, and other resources to maintain course conditions while controlling costs' },
          { name: 'Quality Control', relevance: 'high', category: 'business', description: 'Ensuring playing surfaces meet exacting standards for a championship-level golf facility' },
          { name: 'Tournament Operations', relevance: 'medium', category: 'business', description: 'Preparing and maintaining course conditions for competitive events according to specific requirements' },
          { name: 'Process Adherence', relevance: 'high', category: 'business', description: 'Following detailed maintenance protocols and schedules to achieve consistent course conditions' },
          
          // Soft Skills
          { name: 'Team Coordination', relevance: 'high', category: 'soft', description: 'Collaborating with grounds crew members to complete daily tasks within tight morning timeframes' },
          { name: 'Attention to Detail', relevance: 'high', category: 'soft', description: 'Maintaining precise standards for course aesthetics and playability through careful work execution' },
          { name: 'Adaptability', relevance: 'medium', category: 'soft', description: 'Adjusting work priorities and techniques based on weather conditions and course usage requirements' },
          { name: 'Time Management', relevance: 'high', category: 'soft', description: 'Completing essential maintenance tasks before golfers begin play, often working in pre-dawn hours' }
        ],
        locations: ['Columbus, OH'],
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
  
  // Format just month and year for timeline brackets
  formatMonthYear(date: Date | null): string {
    if (!date) return 'Present';
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
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