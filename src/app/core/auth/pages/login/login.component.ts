import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  clientLoginForm = new FormGroup({
    rut: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor() {}
  
  onSubmit() {
    console.log(this.clientLoginForm.value);
  }
}
