// src/app/components/skill-filter/skill-filter.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  template: `
    <div class="skill-filter-container">
      <div class="search-container">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="onSearchInput()"
            placeholder="Search by skill..."
            class="skill-search-input"
          />
          <button class="clear-btn" *ngIf="searchTerm" (click)="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <button class="view-all-btn" (click)="togglePopup()">
          <span>View All Skills</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 10l5 5 5-5"></path>
          </svg>
        </button>
      </div>

      <!-- Search Results -->
      <div class="search-results" *ngIf="searchTerm && filteredSkills.length > 0">
        <div
          *ngFor="let skill of filteredSkills"
          class="skill-suggestion"
          (click)="selectSkill(skill)"
        >
          {{ skill }}
        </div>
      </div>

      <!-- Active Filters Display -->
      <div class="active-filters" *ngIf="selectedSkills.length > 0">
        <div class="filter-tag" *ngFor="let skill of selectedSkills">
          {{ skill }}
          <button class="remove-tag" (click)="removeSkill(skill)">×</button>
        </div>
      </div>

      <!-- Skill Popup -->
      <div class="popup-overlay" *ngIf="isPopupOpen" (click)="closePopup($event)">
        <div class="skill-popup" [@popupAnimation]="isPopupOpen ? 'open' : 'closed'">
          <div class="popup-header">
            <h3>Filter by Skills</h3>
            <button class="close-btn" (click)="closePopup($event)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="popup-content">
            <div class="skills-counter">
              <span>{{ getTotalMatchingCourses() }} matching courses</span>
            </div>
            
            <div class="categories-container">
              <div class="skill-category" *ngFor="let category of skillCategories">
                <h4 class="category-title">{{ category.title }}</h4>
                <p class="category-description">{{ category.description }}</p>
                <div class="category-skills">
                  <div 
                    *ngFor="let skill of category.skills" 
                    class="skill-checkbox-item"
                  >
                    <label class="custom-checkbox">
                      <input 
                        type="checkbox" 
                        [checked]="isSkillSelected(skill)"
                        (change)="toggleSkill(skill)"
                      />
                      <span class="checkmark"></span>
                      <span class="skill-label">{{ skill }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="popup-footer">
            <button class="select-all-btn" (click)="selectAllSkills()">Select All</button>
            <button class="clear-all-btn" (click)="clearAllSkills()">Clear All</button>
            <button class="apply-btn" (click)="applyFilters()">
              <span class="btn-text">Apply Filters</span>
              <div class="loader" *ngIf="isLoading"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skill-filter-container {
      position: relative;
      margin-bottom: 30px;
    }
    
    .search-container {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .search-box {
      position: relative;
      flex: 1;
    }
    
    .skill-search-input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border-radius: 25px;
      border: 1px solid var(--light-gray);
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .skill-search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }
    
    .clear-btn {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray);
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .clear-btn:hover {
      color: var(--primary);
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .view-all-btn {
      padding: 0 20px;
      height: 44px;
      border-radius: 22px;
      background-color: var(--primary);
      color: white;
      border: none;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
    }
    
    .view-all-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
    }
    
    .view-all-btn svg {
      transition: transform 0.3s ease;
    }
    
    .view-all-btn:hover svg {
      transform: rotate(180deg);
    }
    
    .search-results {
      position: absolute;
      top: 50px;
      left: 0;
      width: calc(100% - 150px);
      max-height: 250px;
      overflow-y: auto;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      z-index: 10;
    }
    
    .skill-suggestion {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .skill-suggestion:hover {
      background-color: rgba(52, 152, 219, 0.1);
      color: var(--primary);
    }
    
    .active-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }
    
    .filter-tag {
      background-color: rgba(52, 152, 219, 0.1);
      color: var(--primary);
      border-radius: 20px;
      padding: 6px 12px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .remove-tag {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      font-size: 1.2rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      padding: 0;
      transition: background-color 0.2s ease;
    }
    
    .remove-tag:hover {
      background-color: rgba(52, 152, 219, 0.2);
    }
    
    /* Popup Styles */
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(3px);
    }
    
    .skill-popup {
      width: 90%;
      max-width: 800px;
      max-height: 85vh;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .popup-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--light-gray);
    }
    
    .popup-header h3 {
      font-size: 1.5rem;
      color: var(--secondary);
      margin: 0;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: var(--gray);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
    
    .close-btn:hover {
      background-color: rgba(0,0,0,0.05);
      color: var(--secondary);
    }
    
    .popup-content {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    
    .skills-counter {
      margin-bottom: 20px;
      padding: 10px 15px;
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      color: var(--primary);
      font-weight: 500;
    }
    
    .categories-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }
    
    .skill-category {
      background-color: #f9f9f9;
      border-radius: 10px;
      padding: 16px;
      border: 1px solid var(--light-gray);
    }
    
    .category-title {
      font-size: 1.2rem;
      color: var(--secondary);
      margin-top: 0;
      margin-bottom: 8px;
    }
    
    .category-description {
      color: var(--gray);
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    
    .category-skills {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 10px;
    }
    
    .skill-checkbox-item {
      position: relative;
    }
    
    /* Custom Checkbox */
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 0.95rem;
      user-select: none;
    }
    
    .custom-checkbox input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    
    .checkmark {
      position: relative;
      height: 18px;
      width: 18px;
      background-color: #fff;
      border: 2px solid var(--gray);
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    .custom-checkbox:hover input ~ .checkmark {
      border-color: var(--primary);
    }
    
    .custom-checkbox input:checked ~ .checkmark {
      background-color: var(--primary);
      border-color: var(--primary);
    }
    
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    .custom-checkbox input:checked ~ .checkmark:after {
      display: block;
    }
    
    .custom-checkbox .checkmark:after {
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    .skill-label {
      flex: 1;
    }
    
    .popup-footer {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--light-gray);
      background-color: #f9f9f9;
    }
    
    .select-all-btn, .clear-all-btn {
      background: none;
      border: none;
      color: var(--primary);
      font-weight: 500;
      cursor: pointer;
      padding: 8px 15px;
      border-radius: 20px;
      transition: all 0.2s ease;
    }
    
    .select-all-btn:hover, .clear-all-btn:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .apply-btn {
      padding: 12px 30px;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 25px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .apply-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
    }
    
    .btn-text {
      transition: opacity 0.3s ease;
    }
    
    .apply-btn .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.3);
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }
      
      .search-results {
        width: 100%;
      }
      
      .categories-container {
        grid-template-columns: 1fr;
      }
      
      .category-skills {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
      
      .popup-footer {
        flex-direction: column;
        gap: 15px;
      }
      
      .popup-footer button {
        width: 100%;
      }
    }
  `],
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
export class SkillFilterComponent implements OnInit {
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
  
  ngOnInit(): void {
    // Distribute skills to categories
    this.distributeSkillsToCategories();
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
    if (this.isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closePopup(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isPopupOpen = false;
      document.body.style.overflow = '';
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
      document.body.style.overflow = '';
    }, 800);
  }
}