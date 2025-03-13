import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills-dashboard',
  templateUrl: './skills-dashboard.component.html',
  styleUrls: ['./skills-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SkillsDashboardComponent implements OnInit {
  skills: Skill[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  selectedSkill: Skill | null = null;

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skills = this.skillsService.getAllSkills();
    this.categories = ['All', ...this.skillsService.getCategories()];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.selectedSkill = null;
  }

  showSkillDetails(skill: Skill) {
    this.selectedSkill = skill;
  }

  closeSkillDetails() {
    this.selectedSkill = null;
  }

  get filteredSkills(): Skill[] {
    return this.selectedCategory === 'All' 
      ? this.skills 
      : this.skills.filter(skill => skill.category === this.selectedCategory);
  }
}