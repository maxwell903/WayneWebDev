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
      period: '2018 - 2022',
      description: 'Studied core concepts of information systems, database management, and business analytics.',
      type: 'education'
    },
    {
      title: 'Web Developer Intern',
      organization: 'Tech Solutions Inc.',
      period: '2021 - 2022',
      description: 'Assisted in developing and maintaining company websites and web applications.',
      type: 'work'
    },
    {
      title: 'Full-Stack Developer',
      organization: 'Digital Innovations LLC',
      period: '2022 - Present',
      description: 'Leading development of web applications using modern JavaScript frameworks.',
      type: 'work'
    }
  ];
}