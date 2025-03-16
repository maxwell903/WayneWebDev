import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkHistorySkillsDropdownComponent } from '../work-history-skills-dropdown/work-history-skills-dropdown.component';

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  bulletPoints: string[];
}

@Component({
  selector: 'app-work-history-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, WorkHistorySkillsDropdownComponent],
  templateUrl: './work-history-summary.component.html',
  styleUrls: ['./work-history-summary.component.css']
})
export class WorkHistorySummaryComponent implements OnInit {
  workExperiences: WorkExperience[] = [];
  
  ngOnInit(): void {
    this.initializeWorkExperiences();
  }
  
  initializeWorkExperiences(): void {
    this.workExperiences = [
      {
        id: 'lcs',
        company: 'London Computer Systems (LCS)',
        role: 'Product Support Specialist II',
        period: 'September 2024 - Present',
        description: 'Providing comprehensive technical support for Rent Manager Property Management Software across specialized queues, including Mobile, Integrations, Technical, General, and Receivables & Payables.',
        bulletPoints: [
          'Serve as a specialized expert in the Mobile queue, assisting property managers with mobile apps, web portals, and API integration issues',
          'Lead troubleshooting for the Integrations queue, resolving complex data transfer problems between Rent Manager and third-party software systems',
          'Diagnose and fix technical issues across multiple support queues, including database structure problems, user permissions, and electronic funds transfer systems',
          'Support accountants and financial professionals in analyzing, interpreting, and troubleshooting complex financial reports and accounting workflows',
          'Guide clients on accounting best practices specific to property management, including accounts receivable/payable processes and financial reconciliation'
        ]
      },
      {
        id: 'midway-gnb',
        company: 'Midway/Good Night John Boy',
        role: 'Bartender/Barback',
        period: 'October 2020 - May 2024',
        description: 'Managed high-volume customer orders and delivered exceptional service in a fast-paced environment, while training new staff members and maintaining bar operations.',
        bulletPoints: [
          'Efficiently managed high-volume customer orders during peak hours',
          'Delivered excellent customer service, resolving issues and enhancing the guest experience',
          'Trained and mentored new staff members on bar procedures and drink preparation',
          'Multitasked managing multiple drink orders, customer interactions, and bar upkeep simultaneously'
        ]
      },
      {
        id: 'perrino',
        company: 'Perrino Landscape Inc.',
        role: 'Foreman (Seasonal)',
        period: 'May 2019 - August 2022',
        description: 'Led and supervised landscape teams while managing projects, schedules, and client relationships during seasonal work spanning multiple years.',
        bulletPoints: [
          'Led and supervised teams of 3-6 individuals, ensuring productivity and adherence to project timelines',
          'Communicated effectively with team members with limited English, utilizing multilingual and non-verbal methods',
          'Managed project schedules and maintained inventory of tools and supplies',
          'Liaised with clients to understand needs, performed site inspections, and ensured high service standards'
        ]
      }
    ];
  }
}