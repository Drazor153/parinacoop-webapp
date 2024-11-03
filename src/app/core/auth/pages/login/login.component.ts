import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormFieldComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  loginForm = new FormGroup({
    rut: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
