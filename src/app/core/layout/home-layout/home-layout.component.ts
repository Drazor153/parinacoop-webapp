import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home-layout.component.html',
})
export default class HomeLayoutComponent {}
