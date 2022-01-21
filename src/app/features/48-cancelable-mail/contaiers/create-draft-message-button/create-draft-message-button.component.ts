import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MailDialogComponent } from '../../components/mail-dialog/mail-dialog.component';

@Component({
  selector: 'nts-create-draft-message-button',
  templateUrl: './create-draft-message-button.component.html',
  styleUrls: ['./create-draft-message-button.component.css']
})
export class CreateDraftMessageButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  createMailHandler() {
    const dialogRef = this.dialog.open(MailDialogComponent, {
      width: '66%',
      // data: { name: 'bob' }
    });
    // dialogRef.afterClosed().subscribe();
  }

  ngOnInit(): void {
  }

}
