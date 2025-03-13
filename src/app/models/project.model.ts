export interface Project {
  id: string;
  title: string;
  description: string;
  // Updated to support multiple images
  imageUrls?: string[];
  // Keep the single imageUrl for backward compatibility
  imageUrl: string; 
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  details: string;
  challenge?: string;
  approaches?: string[];
  features?: string[];
  outcome?: string;
}