import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconComponent } from '@app/shared/components';
import { DapService } from './dap.service';
import { Subscription } from 'rxjs';
import { Dap } from './models/dap.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { DapStatusPipe } from './pipes/dap-status.pipe';
import { DapStatusEnum } from './models/dap-status.enum';

@Component({
  selector: 'app-dap',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    DatePipe,
    NgClass,
    CurrencyPipe,
    DapStatusPipe,
  ],
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
      const { totalActiveDaps, totalProfit } = this.dapService.getTotals(
        this.userDaps,
      );
      this.totalDaps = totalActiveDaps;
      this.totalProfit = totalProfit;
    });
  }

  ngOnDestroy(): void {
    this.dapSubscription?.unsubscribe();
  }
}
