import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { Commune } from '@features/profile/models/Commune';
import { Profile } from '@shared/models/profile.model';
import { runValidator } from '@shared/validators/runValidator';
import { FormFieldComponent } from '@shared/components';
import { FormGroupTypeBuilder } from '@shared/types';

import { ProfileService } from './services/profile.service';
import { Region } from './models/Region';
import { LocationService } from './services/location.service';

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
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: ProfileForm;
  regions: Region[] = [];
  communes: Commune[] = [];
  loading = false;

  userProfileSubscription: Subscription | undefined;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private locationService: LocationService,
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

    this.getRegions();
    this.userProfileSubscription = this.profileService.userProfile$.subscribe({
      next: (data) => {
        if (data) {
          this.profileForm.patchValue(data);
          this.loading = false;
        }
      },
    });
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
      this.getCommunes();
      this.profileForm.enable();
    }
    this.isEditing = !this.isEditing;
  }

  getRegions(): void {
    this.locationService.getRegions().subscribe((data) => {
      this.regions = data;
    });
  }

  getCommunes(): void {
    const regionIdCtrl = this.fc('regionId');
    this.locationService
      .getCommunesByRegionId(+regionIdCtrl.value)
      .subscribe((data) => {
        // this.fc('communeId').setValue(0);
        this.communes = data;
      });
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }
}
