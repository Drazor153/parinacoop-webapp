import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroupTypeBuilder } from '@app/shared/types';

// type ProfileForm = FormGroupTypeBuilder<{
//   names: string;
//   contact: {
//     email: string,
//     cellphone: string
//   }
// }>;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      names: ['', Validators.required],
      contact: this.fb.group({
        email: [''],
        cellphone: [''],
      }),
    });
  }

  ngOnDestroy(): void {}

  updateProfile(): void {
    console.log(this.profileForm.value);
  }
}
