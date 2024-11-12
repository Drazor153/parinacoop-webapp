import { Component, Input } from '@angular/core';

type SVGIcon = 'marker' | 'WhatsApp' | 'mail';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  @Input({ required: true }) icon!: SVGIcon;
}
