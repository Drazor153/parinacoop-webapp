import { FormControl, FormGroup } from '@angular/forms';

export type FormGroupTypeBuilder<T extends {}> = FormGroup<{
  [K in keyof T]: FormControl<T[K] | null>;
}>;
