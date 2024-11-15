import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconComponent } from '@app/shared/components';
import { DapService } from './dap.service';
import { Subscription } from 'rxjs';
import { Dap } from './dap.model';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-dap',
  standalone: true,
  imports: [SvgIconComponent, RouterLink, DatePipe, NgClass],
  templateUrl: './dap.component.html',
})
export default class DapComponent implements OnInit, OnDestroy {
  private dapSubscription: Subscription | undefined;
  userDaps!: Dap[];
  constructor(private readonly dapService: DapService) {}

  ngOnInit(): void {
    this.dapSubscription = this.dapService.getDapList().subscribe((data) => {
      this.userDaps = data;
    });
  }

  ngOnDestroy(): void {
    this.dapSubscription?.unsubscribe();
  }
}
