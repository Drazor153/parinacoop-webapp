import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '@app/shared/components';
import { runValidator } from '@shared/validators/runValidator';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Region } from './models/Region';
import { ProfileService } from './profile.service';
import { FormGroupTypeBuilder } from '@app/shared/types';
import { Commune } from '@app/shared/models/commune.model';

type ProfileForm = FormGroupTypeBuilder<{
  run: string;
  names: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  cellphone: string;
  street: string;
  number: string;
  detail: string;
  region: Region;
  commune: Commune;
}>;

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
    AsyncPipe,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: ProfileForm;
  regions$!: Observable<Region[]>;
  loading = false;
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
      // documentNumber: ['', Validators.required],
      cellphone: ['', Validators.required],
      // typeAddress: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      detail: [''],
      region: [{} as Region, Validators.required],
      commune: [{} as Commune, Validators.required],
    });
    this.loading = true;

    this.regions$ = this.profileService.getRegions();

    this.profileService
      .getUser()
      .pipe(take(1))
      .subscribe({
        next: (profile) => {
          this.profileForm.patchValue(profile);
        },
      });
    this.loading = false;
  }

  ngOnDestroy(): void {}

  updateProfile(): void {
    console.log(this.profileForm.value);
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }
}
