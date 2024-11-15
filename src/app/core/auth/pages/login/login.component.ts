import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { validateRut, getRutDigits } from '@fdograph/rut-utilities';

import { FormGroupTypeBuilder } from '@app/shared/types';
import { SpinnerComponent } from '@app/shared/components';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

import { LoginService } from './login.service';

type LoginForm = FormGroupTypeBuilder<{
  run: string;
  password: string;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormFieldComponent, SpinnerComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent implements OnInit, OnDestroy {
  loginForm!: LoginForm;
  loginSubscription!: Subscription;

  isSubmitting: boolean = false;
  loginErrorMsg: string = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      run: ['', [Validators.required, runValidator]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.router.navigate(['/home']);
    // const credentials = {
    //   run: +getRutDigits(this.loginForm.value.run!),
    //   password: this.loginForm.value.password!,
    // };
    // this.loginErrorMsg = '';
    // this.isSubmitting = true;
    // this.loginSubscription = this.loginService.login(credentials).subscribe({
    //   next: (response) => {
    //     this.router.navigate(['/home']);
    //   },
    //   error: ({ error }) => {
    //     this.loginErrorMsg = error.message;
    //     this.isSubmitting = false;
    //   },
    // });
  }
}

export const runValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;

  return validateRut(value) ? null : { incorrectFormat: true };
};
