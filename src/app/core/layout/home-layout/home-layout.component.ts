import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home-layout.component.html',
})
export default class HomeLayoutComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
