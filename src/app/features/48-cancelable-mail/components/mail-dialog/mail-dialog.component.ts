import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { actions } from '../../store';
import { MailStatus, MailEntityParams } from '../../models/mail-entity';

@Component({
  selector: 'nts-mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrls: ['./mail-dialog.component.css']
})
export class MailDialogComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private dialogRef: MatDialogRef<MailDialogComponent>
  ) { }

  sendHandler() {
    const emailEntity = this.getEntity();
    this.store.dispatch(actions.sendMailStarted(emailEntity));
  }

  closeHandler() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  private getEntity(): MailEntityParams {
    return {
      title: 'Meeting',
      to: ['qq@qq.qq'],
      from: 'ww@ww.ww',
      content: 'Lorem ipsum...',
      createdAt: 1234567,
      status: MailStatus.Sent
    };
  }

}
