export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  details: string;
  challenge?: string;
  approaches?: string[];
  features?: string[];
  outcome?: string;
}