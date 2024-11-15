import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconComponent } from '@app/shared/components';
import { DapService } from './dap.service';
import { Subscription } from 'rxjs';
import { Dap } from './dap.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { DapPipe } from '@app/shared/pipes';

@Component({
  selector: 'app-dap',
  standalone: true,
  imports: [SvgIconComponent, RouterLink, DatePipe, NgClass, CurrencyPipe, DapPipe],
  templateUrl: './dap.component.html',
})
export default class DapComponent implements OnInit, OnDestroy {
  private dapSubscription: Subscription | undefined;
  userDaps!: Dap[];
  totalProfit: number = 0;
  totalDaps: number = 0;

  constructor(private readonly dapService: DapService) {}

  ngOnInit(): void {
    this.dapSubscription = this.dapService.getDapList().subscribe((data) => {
      this.userDaps = data;
      this.totalDaps = data.reduce(
        (prev, cur) =>
          prev + (cur.status === 'active' ? cur.initial_amount : 0),
        0,
      );
    });
  }

  ngOnDestroy(): void {
    this.dapSubscription?.unsubscribe();
  }
}
