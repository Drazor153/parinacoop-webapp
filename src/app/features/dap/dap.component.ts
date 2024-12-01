import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconComponent } from '@app/shared/components';
import { DapService } from './dap.service';
import { Observable, Subscription } from 'rxjs';
import { Dap } from './models/dap.model';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { DapStatusPipe } from './pipes/dap-status.pipe';

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
    AsyncPipe
  ],
  templateUrl: './dap.component.html',
})
export default class DapComponent implements OnInit, OnDestroy {
  private dapSubscription?: Subscription;
  userDaps$?: Observable<Dap[]>;
  totalProfit: number = 0;
  totalDaps: number = 0;

  isLoading = false;

  constructor(private readonly dapService: DapService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userDaps$ = this.dapService.daps$;
    this.dapSubscription = this.dapService.getDapList().subscribe((data) => {
      // this.userDaps = data;
      const { totalActiveDaps, totalProfit } = this.dapService.getTotals(data);
      this.totalDaps = totalActiveDaps;
      this.totalProfit = totalProfit;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.dapSubscription?.unsubscribe();
  }
}
