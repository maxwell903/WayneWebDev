import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ImageCarouselComponent],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  projectImages: string[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    // Get the project images using the service helper method
    // This handles fallbacks for projects that don't have multiple images defined
    this.projectImages = this.projectService.getProjectImages(this.project);
  }
}