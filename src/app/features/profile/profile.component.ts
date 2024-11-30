import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { Commune } from '@features/profile/models/Commune';
import { runValidator } from '@shared/validators/runValidator';
import { FormFieldComponent, SpinnerComponent } from '@shared/components';
import { FormGroupTypeBuilder } from '@shared/types';

import { ProfileService } from './services/profile.service';
import { Region } from './models/Region';
import { LocationService } from './services/location.service';
import {
  formatRut,
  getRutDigits,
  RutFormat,
  calculateRutVerifier,
} from '@fdograph/rut-utilities';
import { UpdateProfileDto } from './interfaces/update-profile.dto';

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
    SpinnerComponent,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit, OnDestroy {
  profileForm = new FormGroup({
    run: new FormControl('', [Validators.required, runValidator]),
    names: new FormControl('', Validators.required),
    firstLastName: new FormControl('', Validators.required),
    secondLastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    documentNumber: new FormControl(0, Validators.required),
    cellphone: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl(0, Validators.required),
    detail: new FormControl(''),
    regionId: new FormControl(0, [Validators.min(1)]),
    communeId: new FormControl(0, [Validators.min(1)]),
  });

  regions$?: Observable<Region[]>;
  communes$?: Observable<Commune[]>;
  userProfileSubscription?: Subscription;

  loading = false;
  isEditing = false;
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.profileForm.disable();
    this.loading = true;
    this.profileService.getCurrentProfile();
    this.regions$ = this.locationService.regions$;
    this.communes$ = this.locationService.communes$;

    this.userProfileSubscription = this.profileService.userProfile$.subscribe({
      next: (data) => {
        if (data) {
          console.log(data.run);
          const runDigits = `${data.run}${calculateRutVerifier(data.run.toString())}`;
          this.profileForm.patchValue({
            ...data,
            run: formatRut(runDigits, RutFormat.DOTS_DASH),
          });
          this.loading = false;
          this.getRegions();
          this.getCommunes(data.regionId);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    this.isSubmitting = true;
    this.profileForm.disable();

    const newData: UpdateProfileDto = {
      run: +getRutDigits(this.fc('run').value),
      documentNumber: this.fc('documentNumber').value,
      names: this.fc('names').value,
      firstLastName: this.fc('firstLastName').value,
      secondLastName: this.fc('secondLastName').value,
      email: this.fc('email').value,
      cellphone: this.fc('cellphone').value,
      street: this.fc('street').value,
      number: this.fc('number').value,
      detail: this.fc('detail').value,
      regionId: this.fc('regionId').value,
      communeId: this.fc('communeId').value,
    };

    this.profileService.updateProfile(newData).subscribe({
      next: (response) => {
        alert(response.msg);
        this.isSubmitting = false;
        this.isEditing = false;
      },
      error: (error) => {
        alert('Error al actualizar el perfil');
        console.error(error);
        this.isSubmitting = false;
        this.profileForm.enable();
      },
    });
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

  getRegions(): void {
    this.locationService.getRegions();
  }

  getCommunes(regionId: number): void {
    console.log(regionId);
    this.locationService.getCommunesByRegionId(regionId);
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }
}
