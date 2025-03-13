import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkillsDashboardComponent } from '../../components/skills-dashboard/skills-dashboard.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkillsDashboardComponent,
    ProjectCardComponent,
    ExperienceTimelineComponent
  ]
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    this.featuredProjects = this.projectService.getAllProjects();
  }
}