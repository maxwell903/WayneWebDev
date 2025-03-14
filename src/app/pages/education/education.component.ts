// src/app/pages/education/education.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';
import { Course } from '../../models/course.model';
import { SkillFilterComponent } from '../../components/skill-filter/skill-filter.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  standalone: true,
  imports: [CommonModule, SkillFilterComponent]
})
export class EducationComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  departments: string[] = [];
  selectedDepartment: string = 'All';
  
  // For the skill filter
  allSkills: string[] = [];
  selectedSkills: string[] = [];
  
  constructor(private educationService: EducationService) {}
  
  ngOnInit(): void {
    // Get all courses
    this.courses = this.educationService.getAllCourses();
    this.filteredCourses = [...this.courses];
    
    // Extract all departments for filter
    const deptSet = new Set<string>();
    this.courses.forEach(course => deptSet.add(course.department));
    this.departments = ['All', ...Array.from(deptSet)];
    
    // Extract all unique skills for the filter
    this.extractAllSkills();
  }
  
  extractAllSkills(): void {
    const skillsSet = new Set<string>();
    
    this.courses.forEach(course => {
      course.skills.forEach(skill => {
        skillsSet.add(skill.name);
      });
    });
    
    this.allSkills = Array.from(skillsSet).sort();
  }
  
  filterByDepartment(department: string): void {
    this.selectedDepartment = department;
    this.applyFilters();
  }
  
  onSkillsSelected(skills: string[]): void {
    this.selectedSkills = skills;
    this.applyFilters();
  }
  
  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      // Department filter
      const matchesDepartment = this.selectedDepartment === 'All' || 
                               course.department === this.selectedDepartment;
      
      // Skills filter
      const matchesSkills = this.selectedSkills.length === 0 || 
                           this.selectedSkills.some(selectedSkill => 
                             course.skills.some(skill => skill.name === selectedSkill)
                           );
      
      return matchesDepartment && matchesSkills;
    });
  }
}