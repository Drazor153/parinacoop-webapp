import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormGroupTypeBuilder } from '@app/shared/types';
import { validateRut, getRutDigits } from '@fdograph/rut-utilities';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

type LoginForm = FormGroupTypeBuilder<{
  run: string;
  password: string;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormFieldComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  loginForm!: LoginForm;

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      run: ['', [Validators.required, runValidator]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(getRutDigits(this.loginForm.value.run!));
  }
}

export const runValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  
  return validateRut(value) ? null : { incorrectFormat: true };
};
