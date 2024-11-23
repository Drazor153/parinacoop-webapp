import { Component, Input } from '@angular/core';

@Component({
  selector: 'dap-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="grid w-[35rem] grid-cols-[50%_50%] py-1">
      <span class="inline-block font-medium text-primary-950">{{ label }}</span>
      <span class="inline-block text-primary-800">{{ value }}</span>
    </div>
  `,
})
export class DetailComponent {
  @Input() label: string = '';
  @Input() value: string = '';
}
