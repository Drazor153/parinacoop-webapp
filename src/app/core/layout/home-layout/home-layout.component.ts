import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/auth/services/auth.service';
import { SvgIconComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';

type NavItem = {
  label: string;
  link: string;
};

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterOutlet, SvgIconComponent, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export default class HomeLayoutComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [
    {
      label: 'Inicio',
      link: './',
    },
    {
      label: 'Depósitos a Plazo',
      link: './deposito-a-plazo'
    },
    {
      label: 'Cuentas de Ahorro',
      link: './cuentas-de-ahorro'
    },
    {
      label: 'Créditos de Consumo',
      link: './creditos-de-consumo'
    },
    {
      label: 'Créditos Comerciales',
      link: './creditos-comerciales'
    },
    {
      label: 'Perfil',
      link: './perfil'
    }
  ];

  userSubscription!: Subscription;
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  logout(): void {
    console.log('s');

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
