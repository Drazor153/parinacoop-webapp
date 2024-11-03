import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldComponent,
      multi: true,
    },
  ],
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  value: string = '';

  onChangeCva = (_value: any) => {};

  valueChanged(value: string): void {
    this.onChangeCva(value);
  }

  registerOnChange(onChange: any): void {
    this.onChangeCva = onChange;
  }

  registerOnTouched(_fn: any): void {}

  writeValue(value: string): void {
    this.value = value;
  }
}
