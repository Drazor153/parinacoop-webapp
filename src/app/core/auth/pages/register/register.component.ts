import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormGroupTypeBuilder } from '@shared/types';
import { FormFieldComponent } from '@shared/components/form-field';

type DataForm = FormGroupTypeBuilder<{
  run: string;
  documentNumber: string;
  email: string;
  cellphone: string;
}>;

type PasswordForm = FormGroupTypeBuilder<{
  password: string;
  confirmPassword: string;
  terms: boolean;
}>;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormFieldComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent implements OnInit {
  dataForm!: DataForm;
  passwordForm!: PasswordForm;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      run: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required]],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  onDataSubmit(): void {
    console.log(this.dataForm.value);
  }
}
