import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { AuthService } from '@app/core/auth/services/auth.service';
import { SvgIconComponent } from '@app/shared/components';
import { NgClass } from '@angular/common';

type NavItem = {
  label: string;
  link: string;
  disabled?: boolean;
};

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export default class HomeLayoutComponent implements AfterViewInit, OnDestroy {
  navItems: NavItem[] = [
    {
      label: 'Inicio',
      link: '.',
    },
    {
      label: 'Depósitos a Plazo',
      link: './deposito-a-plazo',
    },
    {
      label: 'Cuentas de Ahorro',
      link: './cuentas-de-ahorro',
      disabled: true,
    },
    {
      label: 'Créditos de Consumo',
      link: './creditos-de-consumo',
      disabled: true,
    },
    {
      label: 'Créditos Comerciales',
      link: './creditos-comerciales',
      disabled: true,
    },
    {
      label: 'Perfil',
      link: './perfil',
    },
  ];
  @ViewChild('linkBackdrop')
  linkBackdrop: ElementRef<HTMLDivElement> | undefined;

  private routerSubscription: Subscription | undefined;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngAfterViewInit(): void {
    this.locateLinkBackdrop(this.router.url);
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => this.locateLinkBackdrop(event.url));
  }

  locateLinkBackdrop(urlEvent: string): void {
    const url = urlEvent.replace('/home', '.');
    const index = this.navItems.findIndex((item) => item.link === url);

    if (this.linkBackdrop) {
      this.linkBackdrop.nativeElement.style.setProperty(
        '--left',
        `${index * 11}rem`,
      );
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
