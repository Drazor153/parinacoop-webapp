import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '@app/shared/components';
import { FormGroupTypeBuilder } from '@app/shared/types';

@Component({
  selector: 'app-new-dap',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
  templateUrl: './new-dap.component.html',
})
export default class NewDapComponent implements OnInit {
  newDapForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newDapForm = this.fb.group({
      type: ['', [Validators.required]],
      initial_amount: [0, [Validators.required, Validators.min(50000)]],
    });
  }

  fc(name: string): FormControl {
    return this.newDapForm.get(name) as FormControl;
  }
}
