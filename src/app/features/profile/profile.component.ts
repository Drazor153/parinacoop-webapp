import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '@app/shared/components';
import { runValidator } from '@shared/validators/runValidator';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Region } from './models/Region';
import { ProfileService } from './profile.service';
import { FormGroupTypeBuilder } from '@app/shared/types';
import { MatIconModule } from '@angular/material/icon';
import { Profile } from '@app/shared/models/profile.model';

// type ProfileForm = FormGroupTypeBuilder<{
//   run: string;
//   names: string;
//   firstLastName: string;
//   secondLastName: string;
//   email: string;
//   cellphone: string;
//   street: string;
//   number: string;
//   detail: string;
//   regionId: number;
//   communeId: number;
// }>;

type ProfileForm = FormGroupTypeBuilder<Profile>;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormFieldComponent,
    MatSelectModule,
    MatIconModule,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: ProfileForm;
  regions$!: Observable<Region[]>;
  loading = false;

  userProfileSubscription: Subscription | undefined;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      run: ['', [Validators.required, runValidator]],
      names: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documentNumber: ['', Validators.required],
      cellphone: ['', Validators.required],
      // typeAddress: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      detail: [''],
      regionId: [0, [Validators.min(1)]],
      communeId: [0, [Validators.min(1)]],
    });
    this.profileForm.disable();
    this.loading = true;

    this.regions$ = this.profileService.getRegions();
    this.userProfileSubscription = this.profileService.userProfile$.subscribe({
      next: (data) => {
        if (data) {
          this.profileForm.patchValue(data);
        }
      },
    });
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.profileService.updateProfile(this.profileForm.value as Profile);
    this.toggleEdit();
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.profileForm.disable();
      this.profileService.resetProfile();
    } else {
      this.profileForm.enable();
    }
    this.isEditing = !this.isEditing;
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }
}
