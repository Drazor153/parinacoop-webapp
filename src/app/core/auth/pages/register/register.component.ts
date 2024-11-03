import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormFieldComponent } from '@shared/components/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);

  dataForm = this.formBuilder.group({
    run: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cellphone: ['', [Validators.required]],
  });

  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, [Validators.requiredTrue]],
  });

  constructor() {}

  onDataSubmit(): void {
    console.log(this.dataForm.value);
  }
}
