import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'waynes-web-dev';
  currentYear: number = new Date().getFullYear();
  isNavOpen = false;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}