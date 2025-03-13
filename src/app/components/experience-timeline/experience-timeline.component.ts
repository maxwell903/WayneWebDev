import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineEvent {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'work';
}

@Component({
  selector: 'app-experience-timeline',
  templateUrl: './experience-timeline.component.html',
  styleUrls: ['./experience-timeline.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExperienceTimelineComponent {
  events: TimelineEvent[] = [
    {
      title: 'BSBA in Management Information Systems',
      organization: 'The Ohio State University',
      period: '20XX - 20XX',
      description: 'Studied core concepts of information systems, database management, and business analytics.',
      type: 'education'
    },
    // Add more placeholder timeline events
  ];
}
