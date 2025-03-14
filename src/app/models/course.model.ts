// src/app/models/course.model.ts

export interface CourseSkill {
    name: string;
    roles: string[];
  }
  
  export interface Course {
    code: string;
    title: string;
    department: string;
    description: string;
    skills: CourseSkill[];
  }