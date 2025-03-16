// src/app/components/about-summary/about-summary.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-summary.component.html',
  styleUrls: ['./about-summary.component.css']
})
export class AboutSummaryComponent {
  isExpanded: boolean = false;
  
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}