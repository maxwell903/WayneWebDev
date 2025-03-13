import { Component, Input, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container">
      <!-- Main carousel -->
      <div class="carousel">
        <!-- Image container with transitions -->
        <div class="carousel-inner">
          <ng-container *ngFor="let image of images; let i = index">
            <img 
              [src]="image" 
              [alt]="altText"
              [class.active]="i === currentIndex"
              (click)="toggleExpand()"
              (error)="handleImageError($event, i)"
            />
          </ng-container>
          
          <!-- Fallback if all images fail to load -->
          <div *ngIf="images.length === 0 || allImagesFailedToLoad" 
               class="fallback-placeholder active"
               (click)="toggleExpand()">
            <div class="placeholder-content">
              <span>{{altText || 'Image not available'}}</span>
            </div>
          </div>
        </div>
        
        <!-- Navigation buttons (only show if multiple images) -->
        <button *ngIf="images.length > 1 && !allImagesFailedToLoad" 
                class="carousel-control prev" 
                (click)="previous(); $event.stopPropagation()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button *ngIf="images.length > 1 && !allImagesFailedToLoad" 
                class="carousel-control next" 
                (click)="next(); $event.stopPropagation()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <!-- Indicator dots (only show if multiple images) -->
        <div *ngIf="images.length > 1 && !allImagesFailedToLoad" class="carousel-dots">
          <button 
            *ngFor="let image of images; let i = index" 
            class="dot" 
            [class.active]="i === currentIndex"
            (click)="goToSlide(i); $event.stopPropagation()"
          ></button>
        </div>
      </div>
      
      <!-- Expanded view overlay -->
      <div *ngIf="isExpanded" class="expanded-view" (click)="closeExpanded($event)">
        <div class="expanded-content">
          <button class="close-btn" (click)="toggleExpand(); $event.stopPropagation()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="expanded-carousel">
            <ng-container *ngIf="!allImagesFailedToLoad; else expandedFallback">
              <img [src]="images[currentIndex]" [alt]="altText">
              
              <button *ngIf="images.length > 1" class="expanded-control prev" (click)="previous(); $event.stopPropagation()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button *ngIf="images.length > 1" class="expanded-control next" (click)="next(); $event.stopPropagation()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </ng-container>
            
            <ng-template #expandedFallback>
              <div class="expanded-fallback">
                <span>{{altText || 'Image not available'}}</span>
              </div>
            </ng-template>
          </div>
          
          <div *ngIf="!allImagesFailedToLoad && images.length > 1" class="expanded-indicator">
            {{currentIndex + 1}} / {{images.length}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    /* Main carousel */
    .carousel {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 8px;
    }
    
    .carousel-inner {
      width: 100%;
      height: 100%;
      position: relative;
    }
    
    .carousel-inner img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    
    .carousel-inner img.active {
      opacity: 1;
      z-index: 1;
    }
    
    /* Fallback placeholder styling */
    .fallback-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    
    .fallback-placeholder.active {
      opacity: 1;
      z-index: 1;
    }
    
    .placeholder-content {
      padding: 20px;
      color: #666;
      font-style: italic;
    }
    
    .expanded-fallback {
      padding: 30px;
      background-color: #333;
      color: white;
      border-radius: 8px;
      text-align: center;
      font-style: italic;
    }
    
    /* Navigation buttons */
    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.7);
      border: none;
      border-radius: 50%;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.3s, background-color 0.3s;
    }
    
    .carousel:hover .carousel-control {
      opacity: 1;
    }
    
    .carousel-control:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    .carousel-control.prev {
      left: 10px;
    }
    
    .carousel-control.next {
      right: 10px;
    }
    
    .carousel-control svg {
      stroke: var(--primary);
      width: 20px;
      height: 20px;
    }
    
    /* Indicator dots */
    .carousel-dots {
      position: absolute;
      bottom: 15px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      z-index: 10;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      border: none;
      padding: 0;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
    }
    
    .dot:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }
    
    .dot.active {
      background-color: var(--primary);
      transform: scale(1.2);
    }
    
    /* Expanded view */
    .expanded-view {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .expanded-content {
      position: relative;
      width: 90%;
      height: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .close-btn {
      position: absolute;
      top: -40px;
      right: 0;
      width: 36px;
      height: 36px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      z-index: 10;
    }
    
    .close-btn svg {
      stroke: white;
      width: 24px;
      height: 24px;
    }
    
    .expanded-carousel {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .expanded-carousel img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
    
    .expanded-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    
    .expanded-control:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    .expanded-control.prev {
      left: 20px;
    }
    
    .expanded-control.next {
      right: 20px;
    }
    
    .expanded-control svg {
      stroke: white;
      width: 30px;
      height: 30px;
    }
    
    .expanded-indicator {
      color: white;
      margin-top: 15px;
      font-size: 16px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .carousel-control {
        width: 30px;
        height: 30px;
      }
      
      .expanded-control {
        width: 40px;
        height: 40px;
      }
      
      .dot {
        width: 8px;
        height: 8px;
      }
    }
  `]
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() altText: string = '';
  
  currentIndex = 0;
  isExpanded = false;
  isPaused = false;
  allImagesFailedToLoad = false;
  
  private destroy$ = new Subject<void>();
  private slideInterval = 6000; // 6 seconds
  private loadErrors: Set<number> = new Set();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only start auto-slide in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Check if all images are valid
      if (this.images.length === 0) {
        this.allImagesFailedToLoad = true;
      }
      this.startAutoSlide();
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  handleImageError(event: Event, index: number): void {
    // Mark this image as failed to load
    this.loadErrors.add(index);
    
    // Check if all images failed to load
    if (this.loadErrors.size === this.images.length) {
      this.allImagesFailedToLoad = true;
    } else if (index === this.currentIndex) {
      // If current image fails, move to next valid image
      this.findNextValidImage();
    }
  }
  
  findNextValidImage(): void {
    let nextIndex = this.currentIndex;
    let attempts = 0;
    
    // Try to find a valid image, checking all possible indices
    while (attempts < this.images.length) {
      nextIndex = (nextIndex + 1) % this.images.length;
      if (!this.loadErrors.has(nextIndex)) {
        this.currentIndex = nextIndex;
        return;
      }
      attempts++;
    }
    
    // If all images failed, set the flag
    this.allImagesFailedToLoad = true;
  }
  
  startAutoSlide(): void {
    interval(this.slideInterval)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isPaused && !this.allImagesFailedToLoad && this.images.length > 1) {
          this.next();
        }
      });
  }
  
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isPaused = true;
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isPaused = false;
  }
  
  previous(): void {
    if (this.allImagesFailedToLoad || this.images.length <= 1) return;
    
    let prevIndex = this.currentIndex;
    let attempts = 0;
    
    // Try to find previous valid image
    while (attempts < this.images.length) {
      prevIndex = prevIndex === 0 ? this.images.length - 1 : prevIndex - 1;
      if (!this.loadErrors.has(prevIndex)) {
        this.currentIndex = prevIndex;
        return;
      }
      attempts++;
    }
  }
  
  next(): void {
    if (this.allImagesFailedToLoad || this.images.length <= 1) return;
    
    let nextIndex = this.currentIndex;
    let attempts = 0;
    
    // Try to find next valid image
    while (attempts < this.images.length) {
      nextIndex = (nextIndex + 1) % this.images.length;
      if (!this.loadErrors.has(nextIndex)) {
        this.currentIndex = nextIndex;
        return;
      }
      attempts++;
    }
  }
  
  goToSlide(index: number): void {
    if (!this.loadErrors.has(index)) {
      this.currentIndex = index;
    }
  }
  
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
  
  closeExpanded(event: MouseEvent): void {
    if (this.isExpanded && event.target === event.currentTarget) {
      this.isExpanded = false;
    }
  }
}