import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { SkillsDashboardComponent } from '../../components/skills-dashboard/skills-dashboard.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule, ExperienceTimelineComponent, SkillsDashboardComponent]
})
export class AboutComponent {
  stats = [
    { number: 3, label: 'Years Experience' },
    { number: 10, label: 'Projects Completed' },
    { number: 12, label: 'Technologies' },
    { number: 4, label: 'Satisfied Clients' }
  ];
}