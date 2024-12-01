import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SpinnerLoaderComponent } from './shared/components/spinner-loader/spinner-loader.component';
import { EventBusService } from './shared/services/event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';
import { ROUTE_TOKENS } from './route-tokens';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'parinacoop-webapp';
  eventBusSub?: Subscription;
  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    console.log('Sesión ha expirado');
    this.authService.logout();
    window.location.reload()
    // this.router.navigate([ROUTE_TOKENS.AUTH_PATH, ROUTE_TOKENS.LOGIN]);
  }
}
