import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-education-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './education-summary.component.html',
  styleUrls: ['./education-summary.component.css']
})
export class EducationSummaryComponent {
  educationDetails = {
    university: 'The Ohio State University',
    location: 'Columbus, Ohio',
    degree: 'Bachelor of Science in Business Administration, Information Systems',
    period: 'August 2019 - May 2024'
  };
}