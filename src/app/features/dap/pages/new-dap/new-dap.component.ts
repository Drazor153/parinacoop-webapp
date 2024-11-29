import { Component, OnInit } from '@angular/core';
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
import { CurrencyPipe, DatePipe, NgClass, PercentPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    NgClass,
  ],
  templateUrl: './new-dap.component.html',
})
export default class NewDapComponent implements OnInit {
  public newDapForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    initialAmount: new FormControl(0, [
      Validators.required,
      Validators.min(50000),
    ]),
    termOption: new FormControl<TermOption | null>(null, [Validators.required]),
    accept: new FormControl(false, [Validators.requiredTrue]),
  });

  get selectedTermOption(): TermOption | null {
    return this.newDapForm.get('termOption')!.value;
  }

  termOptions: TermOption[] = [];
  isLoadingTermOptions = false;

  constructor(private newDapService: NewDapService) {}

  ngOnInit(): void {
    this.newDapService.getTermOptions('', 300000).subscribe((terms) => {
      this.termOptions = terms;
    });
  }

  getTermOptions(): void {
    const type = this.newDapForm.controls.type.value!;
    const initialAmount = this.newDapForm.controls.initialAmount.value!;
  }

  selectTermOption(val: TermOption): void {
    this.newDapForm.patchValue({ termOption: val });
  }

  handleSubmit(): void {
    console.log(this.newDapForm.value);
  }

  fc(name: string): FormControl {
    return this.newDapForm.get(name) as FormControl;
  }
}
