import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class HeaderComponent {
  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  // Add this new method to close the nav
  closeNav() {
    this.isNavOpen = false;
  }
}