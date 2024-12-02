import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '@app/shared/components';
import { NewDapService } from './new-dap.service';
import { TermOption } from './models/TermOption';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgClass,
  PercentPipe,
} from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/services/auth.service';
import { ROUTE_TOKENS } from '@app/route-tokens';

@Component({
  selector: 'app-new-dap',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormFieldComponent,
    DatePipe,
    PercentPipe,
    CurrencyPipe,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './new-dap.component.html',
})
export default class NewDapComponent implements OnInit, OnDestroy {
  public simulateFirstForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    initialAmount: new FormControl(0, [
      Validators.required,
      Validators.min(50000),
    ]),
  });
  public simulateSecondForm = new FormGroup({
    termOption: new FormControl<TermOption | null>(null, [Validators.required]),
    accept: new FormControl(false, [Validators.requiredTrue]),
  });

  get selectedTermOption(): TermOption | null {
    return this.simulateSecondForm.controls.termOption.value;
  }

  termOptions$?: Observable<TermOption[]>;
  isLoadingTermOptions = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private newDapService: NewDapService,
  ) {}

  ngOnInit(): void {
    this.termOptions$ = this.newDapService.termOptions$;
  }
  ngOnDestroy(): void {
      
  }

  getTermOptions(): void {
    const { type, initialAmount } = this.simulateFirstForm.value;
    this.newDapService.getTermOptions(type!, +initialAmount!);
  }

  selectTermOption(val: TermOption): void {
    this.simulateSecondForm.controls.termOption.setValue(val);
  }

  handleSubmit(): void {
    const { initialAmount, type } = this.simulateFirstForm.value;

    const days = +this.simulateSecondForm.value.termOption!.days;
    this.newDapService
      .createDap({
        userRun: this.authService.run,
        currencyType: 'CLP',
        days,
        initialAmount: +initialAmount!,
        type: type!,
      })
      .subscribe({
        next: (response) => {
          alert('DAP creado correctamente');
          console.log(response);
          this.router.navigate([ROUTE_TOKENS.CLIENT_PATH, ROUTE_TOKENS.DAP]);
        },
        error: (error) => {
          alert('Ha ocurrido un error');
          console.error(error);
        },
      });
  }

  fs(name: string): FormControl {
    return this.simulateFirstForm.get(name) as FormControl;
  }
}
