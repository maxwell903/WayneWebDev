import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  submitForm() {
    console.log('Form submitted:', this.formData);
    // Here you would typically handle the form submission with a service
    // For now, we'll just reset the form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}