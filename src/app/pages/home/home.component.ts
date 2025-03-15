import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { EducationSummaryComponent } from '../../components/education-summary/education-summary.component';
import { ProjectsSummaryComponent } from '../../components/projects-summary/projects-summary.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EducationSummaryComponent,
    ProjectsSummaryComponent,
    ProjectCardComponent,
    ExperienceTimelineComponent
  ]
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    // Use the dedicated method for featured projects
    this.featuredProjects = this.projectService.getFeaturedProjects();
  }
}