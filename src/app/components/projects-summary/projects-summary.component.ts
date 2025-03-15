import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { SkillsDropdownComponent } from '../skills-dropdown/skills-dropdown.component';

@Component({
  selector: 'app-projects-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, SkillsDropdownComponent],
  templateUrl: './projects-summary.component.html',
  styleUrls: ['./projects-summary.component.css']
})
export class ProjectsSummaryComponent implements OnInit {
  projects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    // Get featured projects from the service
    this.projects = this.projectService.getFeaturedProjects();
  }
}