import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { validateRut, getRutDigits } from '@fdograph/rut-utilities';

import { FormGroupTypeBuilder } from '@app/shared/types';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';

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
export default class LoginComponent implements OnInit, OnDestroy {
  loginForm!: LoginForm;
  loginSuscription!: Subscription;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      run: ['', [Validators.required, runValidator]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.loginSuscription?.unsubscribe();
  }

  onSubmit(): void {
    const credentials = {
      run: +getRutDigits(this.loginForm.value.run!),
      password: this.loginForm.value.password!,
    };
    this.loginSuscription = this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: ({ error }) => {
        console.error(error.message);
      },
    });
  }
}

export const runValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;

  return validateRut(value) ? null : { incorrectFormat: true };
};
