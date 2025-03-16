import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-education-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="education-card">
        <h2>EDUCATION</h2>
        <div class="education-entry">
          <div class="university-line">
            <span class="university">The Ohio State University</span>
            <span class="location">Columbus, Ohio</span>
          </div>
          <div class="degree-line">
            <span class="degree">Bachelor of Science in Business Administration, Information Systems</span>
            <span class="period">August 2019 – May 2024</span>
          </div>
          
          <!-- Education details dropdown -->
          <div class="education-dropdown">
            <div 
              class="education-trigger" 
              (click)="toggleEducationOpen()"
              [class.active]="isEducationOpen">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                [class.rotated]="isEducationOpen"
                class="chevron-icon">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <span><strong>Curriculum Focus:</strong> Database Management, Business Analytics, Software Development, Information Systems Architecture</span>
            </div>
            
            <div class="education-content" *ngIf="isEducationOpen">
              <p class="education-description">
                My MIS program at Ohio State combined technical proficiency with business acumen through coursework in database systems, software development, and business analytics. I mastered SQL, data structures, and object-oriented programming while gaining expertise in requirements gathering, systems analysis, and business process optimization. Key technical courses included Database Systems, Data Structures in Java, and Business Application Development, complemented by business courses in Strategic Management and Financial Analysis. I balanced academics with active participation in club soccer and intramural basketball, developing teamwork and leadership skills while maintaining Dean's List standing. This comprehensive education prepared me to bridge technical implementation with business needs, making me well-equipped for roles requiring both coding expertise and business process understanding.
              </p>
            </div>
          </div>
          
          <ul class="achievement-list">
            <li><a routerLink="/education">• Dean's List</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      width: 100%;
      padding: 0 15px;
    }
    
    .education-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 25px;
      margin-bottom: 30px;
      border-top: 3px solid var(--primary, #3498db);
      width: 100%;
      box-sizing: border-box;
    }
    
    .education-card h2 {
      font-size: 16px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 15px;
      text-transform: uppercase;
      color: var(--secondary, #2c3e50);
    }
    
    .education-entry {
      margin-left: 0;
    }
    
    .university-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    
    .university {
      font-weight: bold;
      color: var(--secondary, #2c3e50);
    }
    
    .location {
      text-align: right;
      color: var(--gray, #95a5a6);
    }
    
    .degree-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    
    .degree {
      font-weight: normal;
      color: var(--dark, #2c3e50);
    }
    
    .period {
      text-align: right;
      color: var(--gray, #95a5a6);
    }
    
    .achievement-list {
      list-style-type: none;
      padding-left: 5px;
      margin-top: 10px;
      margin-bottom: 0;
    }
    
    .achievement-list li {
      margin-bottom: 5px;
    }
    
    .achievement-list a {
      color: var(--dark, #2c3e50);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .achievement-list a:hover {
      color: var(--primary, #3498db);
    }
    
    /* Education dropdown styles */
    .education-dropdown {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .education-trigger {
      color: var(--gray, #95a5a6);
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 6px 0;
      transition: all 0.2s ease;
    }
    
    .education-trigger:hover {
      color: var(--primary, #3498db);
    }
    
    .education-trigger.active {
      color: var(--primary, #3498db);
    }
    
    .chevron-icon {
      margin-right: 8px;
      transition: transform 0.3s ease;
    }
    
    .chevron-icon.rotated {
      transform: rotate(180deg);
    }
    
    .education-content {
      padding-top: 10px;
      padding-bottom: 10px;
      animation: fadeIn 0.3s ease-out;
    }
    
    .education-description {
      color: var(--gray, #95a5a6);
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
      padding-left: 8px;
      border-left: 2px solid var(--primary, #3498db);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .university-line, .degree-line {
        flex-direction: column;
      }
      
      .location, .period {
        text-align: left;
        margin-top: 2px;
      }
    }
  `]
})
export class EducationSummaryComponent {
  educationDetails = {
    university: 'The Ohio State University',
    location: 'Columbus, Ohio',
    degree: 'Bachelor of Science in Business Administration, Information Systems',
    period: 'August 2019 - May 2024'
  };
  
  isEducationOpen: boolean = false;

  toggleEducationOpen(): void {
    this.isEducationOpen = !this.isEducationOpen;
  }
}