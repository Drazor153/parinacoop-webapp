import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

type FormatTypes = 'run' | 'noFormat';

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
  @Input() placeholder: string = '';
  @Input({ required: false }) format: FormatTypes = 'noFormat';
  value: string = '';

  onChangeCva = (_value: any) => {};
  onTouchedCva = () => {};
  touched: boolean = false;
  disabled: boolean = false;

  valueChanged(value: string): void {
    this.value = value;
    this.onChangeCva(this.value);
  }

  onFocus(): void {
    if (this.value && this.format === 'run') {
      this.value = this.value.replace(/[^0-9kK]/g, ''); // Quita el formato
      this.valueChanged(this.value); // Actualiza el valor sin formato
    }
  }

  onBlur(): void {
    if (this.value && this.format === 'run') {
      this.value = formatRut(this.value, RutFormat.DOTS_DASH); // Aplica el formato
      this.valueChanged(this.value); // Actualiza el valor formateado
    }
    this.markAsTouched();
  }

  onKeyPress(event: KeyboardEvent): boolean {
    if (this.format === 'run') {
      const allowedChars = /[0-9kK]/;
      const key = event.key;
      if (key === 'Enter') return true;

      // Permitir solo números y la letra 'K' o 'k'
      if (!allowedChars.test(key)) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChangeCva = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouchedCva = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouchedCva();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
