import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Dap } from '../../models/dap.model';
import { DapStatusPipe } from '../../pipes/dap-status.pipe';
import { DapTypePipe } from '../../pipes/dap-type.pipe';

import { DapDialogDetailsComponent } from '../dap-dialog-details/dap-dialog-details.component';
import { IdPadPipe } from '../../pipes/id-pad.pipe';

@Component({
  selector: 'app-dap-item',
  standalone: true,
  imports: [NgClass, DatePipe, CurrencyPipe, DapStatusPipe, DapTypePipe, IdPadPipe],
  templateUrl: './dap-item.component.html',
})
export class DapItemComponent {
  @Input({ required: true }) dap!: Dap;

  constructor(private dialog: MatDialog) {}

  openDialog(data: Dap): void {
    this.dialog.open(DapDialogDetailsComponent, {
      data,
    });
  }
}
