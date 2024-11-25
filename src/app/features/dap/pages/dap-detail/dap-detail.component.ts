import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, PercentPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import { SpinnerComponent, SvgIconComponent } from '@app/shared/components';

import { DapService } from '../../dap.service';
import { Dap } from '../../models/dap.model';
import { DapStatusPipe } from '../../pipes/dap-status.pipe';

import { DetailComponent } from './components/detail.component';

@Component({
  selector: 'app-dap-detail',
  standalone: true,
  imports: [
    RouterLink,
    SvgIconComponent,
    DetailComponent,
    CurrencyPipe,
    DatePipe,
    DapStatusPipe,
    PercentPipe,
    SpinnerComponent,
    NgClass,
  ],
  templateUrl: './dap-detail.component.html',
})
export default class DapDetailComponent implements OnInit {
  dapId!: number;
  currentDap: Dap | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dapService: DapService,
  ) {}

  ngOnInit(): void {
    this.dapId = +this.route.snapshot.paramMap.get('id')!;
    this.dapService
      .getDapById(this.dapId)
      .pipe(take(1))
      .subscribe((data) => {
        this.setCurrentDap(data);
      });
  }

  setCurrentDap(dap: Dap | undefined): void {
    if (!dap) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
    this.currentDap = dap;
  }
}
