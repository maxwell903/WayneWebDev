// src/app/components/class-search/class-search.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SearchSuggestion {
  type: 'skill' | 'department';
  value: string;
  display: string;
}

@Component({
  selector: 'app-class-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (input)="onSearchInput()"
          (focus)="onFocus()"
          (blur)="onBlur()"
          placeholder="Search skills or departments..."
          class="search-input"
          [class.active]="isInputActive"
        />
        <button *ngIf="searchTerm" class="clear-btn" (click)="clearSearch($event)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      
      <div class="suggestions-container" *ngIf="showSuggestions && filteredSuggestions.length > 0">
        <div class="suggestion-group" *ngIf="getFilteredSuggestionsByType('skill').length > 0">
          <div class="suggestion-group-header">Skills</div>
          <div 
            *ngFor="let suggestion of getFilteredSuggestionsByType('skill')" 
            class="suggestion-item"
            (mousedown)="selectSuggestion(suggestion)">
            <span class="skill-indicator">S</span>
            {{suggestion.display}}
          </div>
        </div>
        
        <div class="suggestion-group" *ngIf="getFilteredSuggestionsByType('department').length > 0">
          <div class="suggestion-group-header">Departments</div>
          <div 
            *ngFor="let suggestion of getFilteredSuggestionsByType('department')" 
            class="suggestion-item"
            (mousedown)="selectSuggestion(suggestion)">
            <span class="department-indicator">D</span>
            {{suggestion.display}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
      margin-bottom: 15px;
      width: 100%;
      max-width: 300px;
    }
    
    .search-input-wrapper {
      display: flex;
      position: relative;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .search-input-wrapper:hover,
    .search-input-wrapper:focus-within {
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    
    .search-input {
      flex: 1;
      border: 1px solid var(--light-gray, #ecf0f1);
      padding: 8px 40px 8px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      color: var(--secondary, #2c3e50);
      transition: all 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: var(--primary, #3498db);
    }
    
    .search-input.active {
      border-color: var(--primary, #3498db);
    }
    
    .clear-btn {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--gray, #95a5a6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }
    
    .clear-btn:hover {
      color: var(--secondary, #2c3e50);
    }
    
    .search-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary, #3498db);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }
    
    .search-btn:hover {
      color: var(--primary-dark, #2980b9);
    }
    
    .suggestions-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 5px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      z-index: 100;
      overflow: hidden;
      animation: fadeIn 0.2s ease-out;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .suggestion-group {
      margin-bottom: 8px;
    }
    
    .suggestion-group:last-child {
      margin-bottom: 0;
    }
    
    .suggestion-group-header {
      padding: 8px 12px;
      background-color: rgba(236, 240, 241, 0.5);
      color: var(--secondary, #2c3e50);
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .suggestion-item {
      padding: 8px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background-color 0.2s ease;
      font-size: 0.9rem;
    }
    
    .suggestion-item:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .skill-indicator,
    .department-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
      font-size: 0.7rem;
      font-weight: bold;
      color: white;
    }
    
    .skill-indicator {
      background-color: var(--primary, #3498db);
    }
    
    .department-indicator {
      background-color: var(--accent, #e74c3c);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .search-container {
        max-width: 100%;
      }
    }
  `]
})
export class ClassSearchComponent implements OnInit {
  @Input() skills: string[] = [];
  @Input() departments: string[] = [];
  @Output() search = new EventEmitter<{type: string, value: string}>();
  
  searchTerm: string = '';
  suggestions: SearchSuggestion[] = [];
  filteredSuggestions: SearchSuggestion[] = [];
  showSuggestions: boolean = false;
  isInputActive: boolean = false;
  
  ngOnInit(): void {
    this.initializeSuggestions();
  }
  
  initializeSuggestions(): void {
    // Initialize skill suggestions
    this.skills.forEach(skill => {
      this.suggestions.push({
        type: 'skill',
        value: skill,
        display: skill
      });
    });
    
    // Initialize department suggestions
    this.departments.forEach(dept => {
      this.suggestions.push({
        type: 'department',
        value: dept,
        display: dept
      });
    });
  }
  
  onSearchInput(): void {
    if (this.searchTerm) {
      this.filterSuggestions();
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
  }
  
  filterSuggestions(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(suggestion => 
      suggestion.display.toLowerCase().includes(searchTermLower)
    );
    
    // Limit the number of suggestions to display
    const maxSuggestionsPerType = 5;
    const skillSuggestions = this.getFilteredSuggestionsByType('skill').slice(0, maxSuggestionsPerType);
    const deptSuggestions = this.getFilteredSuggestionsByType('department').slice(0, maxSuggestionsPerType);
    
    this.filteredSuggestions = [...skillSuggestions, ...deptSuggestions];
  }
  
  getFilteredSuggestionsByType(type: 'skill' | 'department'): SearchSuggestion[] {
    return this.filteredSuggestions.filter(suggestion => suggestion.type === type);
  }
  
  selectSuggestion(suggestion: SearchSuggestion): void {
    this.searchTerm = suggestion.display;
    this.showSuggestions = false;
    this.search.emit({type: suggestion.type, value: suggestion.value});
  }
  
  clearSearch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.searchTerm = '';
    this.showSuggestions = false;
    this.search.emit({type: 'clear', value: ''});
  }
  
  onFocus(): void {
    this.isInputActive = true;
    if (this.searchTerm) {
      this.filterSuggestions();
      this.showSuggestions = true;
    }
  }
  
  onBlur(): void {
    this.isInputActive = false;
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}