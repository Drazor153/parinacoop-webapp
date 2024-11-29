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
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { Commune } from '@features/profile/models/Commune';
import { runValidator } from '@shared/validators/runValidator';
import { FormFieldComponent } from '@shared/components';
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
import { UpdateProfileDto } from './interfaces/update-profiel.dto';

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
  regions: Region[] = [];
  communes: Commune[] = [];
  loading = false;

  userProfileSubscription?: Subscription;
  isEditing = false;

  constructor(
    private profileService: ProfileService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.profileForm.disable();
    this.loading = true;
    this.profileService.getCurrentProfile();

    // this.getRegions();
    this.userProfileSubscription = this.profileService.userProfile$.subscribe({
      next: (data) => {
        if (data) {
          console.log(data.run);
          this.regions = [{ id: data.region.id, name: data.region.name }];
          this.communes = [{ id: data.commune.id, name: data.commune.name }];

          const runDigits = `${data.run}${calculateRutVerifier(data.run.toString())}`;
          this.profileForm.patchValue({
            ...data,
            run: formatRut(runDigits, RutFormat.DOTS_DASH),
            regionId: data.region.id,
            communeId: data.commune.id,
          });
          this.loading = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
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
      regionId: this.profileForm.controls.regionId.value!,
      communeId: this.profileForm.controls.communeId.value!,
    };
    this.profileService.updateProfile(newData);
    this.isEditing = false;
    this.profileForm.disable();
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.profileForm.disable();
      this.profileService.resetProfile();
    } else {
      this.getRegions();
      this.getCommunes(this.profileForm.controls.regionId.value!);
      this.profileForm.enable();
    }
    this.isEditing = !this.isEditing;
  }

  getRegions(): void {
    this.locationService.getRegions().subscribe((data) => {
      this.regions = data;
    });
  }

  getCommunes(regionId: number): void {
    console.log(regionId);

    // const regionIdCtrl = this.profileForm.controls.regionId.value!;
    this.locationService.getCommunesByRegionId(regionId).subscribe((data) => {
      // this.fc('communeId').setValue(0);
      this.communes = data;
    });
  }

  fc(name: string): FormControl {
    return this.profileForm.get(name) as FormControl;
  }
}
