import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
selector: 'app-education-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './education-summary.component.html',
  styleUrls: ['./education-summary.component.css']
})
export class EducationSummaryComponent implements OnInit {
  educationDetails = {
    university: 'The Ohio State University',
    location: 'Columbus, Ohio',
    degree: 'Bachelor of Science in Business Administration, Information Systems',
    period: 'August 2019 - May 2024'
  };
  
  courseHighlights = [
    { code: 'CSE 3232', title: 'Software Requirements Analysis' },
    { code: 'CSE 3241', title: 'Introduction to Database Systems' },
    { code: 'ACCTMIS 4630', title: 'Business Systems Application Development' },
    { code: 'ACCTMIS 4670', title: 'IS Planning & Management' }
  ];
  
  ngOnInit(): void {
    // Any initialization code can go here
  }
}