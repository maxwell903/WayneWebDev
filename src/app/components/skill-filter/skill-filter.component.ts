import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-skill-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-filter.component.html',
  styleUrls: ['./skill-filter.component.css'],
  animations: [
    trigger('popupAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.8)',
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      transition('closed => open', [
        animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('open => closed', [
        animate('0.2s cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class SkillFilterComponent implements OnInit, OnDestroy {
  @Input() allSkills: string[] = [];
  @Input() courseCount: number = 0;
  @Output() skillsSelected = new EventEmitter<string[]>();
  
  searchTerm: string = '';
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];
  isPopupOpen: boolean = false;
  isLoading: boolean = false;
  
  skillCategories: SkillCategory[] = [
    {
      title: 'Web & Application Development',
      description: 'Skills focused on building modern web and software applications',
      skills: []
    },
    {
      title: 'Data & Database Management',
      description: 'Skills related to storing, retrieving, and analyzing data',
      skills: []
    },
    {
      title: 'Software Engineering Fundamentals',
      description: 'Core programming and algorithm concepts',
      skills: []
    },
    {
      title: 'IT Business Analysis',
      description: 'Bridging technology and business needs',
      skills: []
    },
    {
      title: 'Project Management & Leadership',
      description: 'Skills for leading technical teams and projects',
      skills: []
    }
  ];

  // Map the skills to relevant categories
  private skillCategoryMap: {[key: string]: number} = {
    // Web & Application Development
    'Business Application Development': 0,
    'Web Development': 0,
    'Frontend Development': 0,
    'User Interface Design': 0,
    'React': 0,
    'Angular': 0,
    'TypeScript': 0,
    'JavaScript': 0,
    'HTML': 0,
    'CSS': 0,
    'Node.js': 0,
    
    // Data & Database Management
    'SQL': 1,
    'Database Design': 1,
    'Data Modeling': 1,
    'Data Normalization': 1,
    'Entity-Relationship Modeling': 1,
    'Database Management': 1,
    'PostgreSQL': 1,
    'MongoDB': 1,
    'Data Visualization': 1,
    'Business Intelligence': 1,
    'Statistical Analysis': 1,
    
    // Software Engineering Fundamentals
    'Java Programming': 2,
    'Python': 2,
    'Object-Oriented Programming': 2,
    'Data Structures': 2,
    'Algorithm Design': 2,
    'Problem Solving': 2,
    'Software Development Lifecycle': 2,
    'Version Control': 2,
    'Testing': 2,
    'Debugging': 2,
    'File Handling': 2,
    'Legacy Systems': 2,
    
    // IT Business Analysis
    'Requirements Gathering': 3,
    'Business Process Analysis': 3,
    'System Architecture': 3,
    'Technical Documentation': 3,
    'User Story Creation': 3,
    'Systems Integration': 3,
    'Enterprise Systems': 3,
    'IT Governance': 3,
    'Systems Analysis': 3,
    'Process Optimization': 3,
    
    // Project Management & Leadership
    'Team Leadership': 4,
    'Project Portfolio Management': 4,
    'Strategic Planning': 4,
    'Team Collaboration': 4,
    'Conflict Resolution': 4,
    'Agile Methodologies': 4,
    'IT Strategic Planning': 4,
    'Performance Management': 4,
    'Business Ethics': 4,
    'Professional Communication': 4
  };
  
  private destroy$ = new Subject<void>();
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    // Distribute skills to categories
    this.distributeSkillsToCategories();
  }
  
  ngOnDestroy(): void {
    // Clean up body class only in browser environments
    if (this.isBrowser && this.isPopupOpen) {
      document.body.classList.remove('modal-open');
    }
    
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  distributeSkillsToCategories() {
    // Reset category skills
    this.skillCategories.forEach(category => {
      category.skills = [];
    });
    
    // Map each skill to its category
    this.allSkills.forEach(skill => {
      const categoryIndex = this.skillCategoryMap[skill] !== undefined 
        ? this.skillCategoryMap[skill] 
        : this.determineCategory(skill);
      
      if (categoryIndex >= 0 && categoryIndex < this.skillCategories.length) {
        this.skillCategories[categoryIndex].skills.push(skill);
      }
    });
  }
  
  // Determine category for unmapped skills based on keywords
  determineCategory(skill: string): number {
    const skillLower = skill.toLowerCase();
    
    if (
      skillLower.includes('web') || 
      skillLower.includes('app') || 
      skillLower.includes('ui') || 
      skillLower.includes('ux') ||
      skillLower.includes('interface') ||
      skillLower.includes('javascript') ||
      skillLower.includes('html') ||
      skillLower.includes('css')
    ) {
      return 0; // Web & Application Development
    }
    
    if (
      skillLower.includes('data') || 
      skillLower.includes('database') || 
      skillLower.includes('sql') || 
      skillLower.includes('analysis') ||
      skillLower.includes('analytics') ||
      skillLower.includes('visualization')
    ) {
      return 1; // Data & Database Management
    }
    
    if (
      skillLower.includes('programming') || 
      skillLower.includes('algorithm') || 
      skillLower.includes('code') || 
      skillLower.includes('software') ||
      skillLower.includes('development') ||
      skillLower.includes('testing')
    ) {
      return 2; // Software Engineering Fundamentals
    }
    
    if (
      skillLower.includes('business') || 
      skillLower.includes('requirements') || 
      skillLower.includes('analysis') || 
      skillLower.includes('documentation') ||
      skillLower.includes('system')
    ) {
      return 3; // IT Business Analysis
    }
    
    if (
      skillLower.includes('management') || 
      skillLower.includes('leadership') || 
      skillLower.includes('team') || 
      skillLower.includes('project') ||
      skillLower.includes('agile') ||
      skillLower.includes('communication')
    ) {
      return 4; // Project Management & Leadership
    }
    
    // Default to Software Engineering if no match
    return 2;
  }
  
  onSearchInput() {
    if (!this.searchTerm) {
      this.filteredSkills = [];
      return;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredSkills = this.allSkills.filter(skill => 
      skill.toLowerCase().includes(searchTermLower)
    );
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.filteredSkills = [];
  }
  
  selectSkill(skill: string) {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.skillsSelected.emit(this.selectedSkills);
    }
    
    this.searchTerm = '';
    this.filteredSkills = [];
  }
  
  removeSkill(skill: string) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    this.skillsSelected.emit(this.selectedSkills);
  }
  
  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    
    // Only manipulate the DOM in browser environments
    if (this.isBrowser) {
      if (this.isPopupOpen) {
        // Force the categories to distribute again when opening
        this.distributeSkillsToCategories();
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }
  }
  
  closePopup(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isPopupOpen = false;
      
      // Only manipulate the DOM in browser environments
      if (this.isBrowser) {
        document.body.classList.remove('modal-open');
      }
    }
  }
  
  forceClosePopup() {
    this.isPopupOpen = false;
    
    // Only manipulate the DOM in browser environments
    if (this.isBrowser) {
      document.body.classList.remove('modal-open');
    }
  }
  
  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }
  
  toggleSkill(skill: string) {
    if (this.isSkillSelected(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    } else {
      this.selectedSkills.push(skill);
    }
  }
  
  selectAllSkills() {
    this.selectedSkills = [...this.allSkills];
  }
  
  clearAllSkills() {
    this.selectedSkills = [];
  }
  
  getTotalMatchingCourses(): number {
    // In a real application, this would count courses matching current filters
    // For now, return a placeholder or mocked value based on selected skills
    return this.selectedSkills.length > 0 ? 
           Math.max(1, Math.min(this.courseCount, Math.ceil(this.courseCount * (this.selectedSkills.length / this.allSkills.length)))) : 
           this.courseCount;
  }
  
  applyFilters() {
    this.isLoading = true;
    
    // Simulate loading to show animation
    setTimeout(() => {
      this.skillsSelected.emit(this.selectedSkills);
      this.isLoading = false;
      this.isPopupOpen = false;
      
      // Only manipulate the DOM in browser environments
      if (this.isBrowser) {
        document.body.classList.remove('modal-open');
      }
    }, 800);
  }
}