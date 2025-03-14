

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EducationComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  departments: string[] = [];
  selectedDepartment: string = 'All';
  skillFilters: string[] = [];
  selectedSkill: string = 'All';
  
  allSkills: Set<string> = new Set();
  
  constructor(private educationService: EducationService) {}
  
  ngOnInit(): void {
    // Get all courses
    this.courses = this.educationService.getAllCourses();
    this.filteredCourses = [...this.courses];
    
    // Extract all departments for filter
    const deptSet = new Set<string>();
    this.courses.forEach(course => deptSet.add(course.department));
    this.departments = ['All', ...Array.from(deptSet)];
    
    // Extract all skills for filter
    this.courses.forEach(course => {
      course.skills.forEach(skill => {
        this.allSkills.add(skill.name);
      });
    });
    this.skillFilters = ['All', ...Array.from(this.allSkills)];
  }
  
  filterByDepartment(department: string): void {
    this.selectedDepartment = department;
    this.applyFilters();
  }
  
  filterBySkill(skill: string): void {
    this.selectedSkill = skill;
    this.applyFilters();
  }
  
  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      // If both filters are "All", return all courses
      if (this.selectedDepartment === 'All' && this.selectedSkill === 'All') {
        return true;
      }
      
      // If department filter is active
      const matchesDepartment = this.selectedDepartment === 'All' || 
                                course.department === this.selectedDepartment;
      
      // If skill filter is active
      const matchesSkill = this.selectedSkill === 'All' || 
                          course.skills.some(skill => skill.name === this.selectedSkill);
      
      // Both filters must match if both are active
      return matchesDepartment && matchesSkill;
    });
  }
}