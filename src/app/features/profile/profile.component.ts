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
import { Observable } from 'rxjs';
import { Region } from './models/Region';
import { ProfileService } from './profile.service';

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
  profileForm!: FormGroup;
  regions$!: Observable<Region[]>;
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
      regionId: ['', Validators.required],
      communeId: ['', Validators.required],
    });

    this.regions$ = this.profileService.getRegions();
  }

  ngOnDestroy(): void {}

  updateProfile(): void {
    console.log(this.profileForm.value);
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }

  displayFn(region: Region): string {
    return region && region.name ? region.name : '';
  }
}
