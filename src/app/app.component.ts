import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SpinnerLoaderComponent } from './shared/components/spinner-loader/spinner-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'parinacoop-webapp';

  constructor() {}
}
