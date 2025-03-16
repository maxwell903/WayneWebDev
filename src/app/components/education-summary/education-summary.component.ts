import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassFilterComponent } from '../class-filter/class-filter.component';

@Component({
  selector: 'app-education-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, ClassFilterComponent],
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
  
  isEducationOpen: boolean = false;

  toggleEducationOpen(): void {
    this.isEducationOpen = !this.isEducationOpen;
  }
}