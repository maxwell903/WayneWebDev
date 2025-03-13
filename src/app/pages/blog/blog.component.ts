import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  url: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BlogComponent {
  posts: BlogPost[] = [
    {
      id: 'post1',
      title: 'Getting Started with Angular 19',
      excerpt: 'Learn about the new features and improvements in Angular 19 and how to use them in your projects.',
      date: 'March 2025',
      category: 'Angular',
      imageUrl: '/assets/images/blog-placeholder.jpg',
      url: '/blog/getting-started-with-angular-19'
    },
    {
      id: 'post2',
      title: 'Effective Netlify Deployment Strategies',
      excerpt: 'Discover best practices for deploying your web applications to Netlify for optimal performance and reliability.',
      date: 'February 2025',
      category: 'DevOps',
      imageUrl: '/assets/images/blog-placeholder.jpg',
      url: '/blog/effective-netlify-deployment-strategies'
    },
    {
      id: 'post3',
      title: 'TypeScript Tips for Better Code Quality',
      excerpt: 'Improve your TypeScript code with these practical tips and patterns for more maintainable applications.',
      date: 'January 2025',
      category: 'TypeScript',
      imageUrl: '/assets/images/blog-placeholder.jpg',
      url: '/blog/typescript-tips-for-better-code-quality'
    }
  ];
}