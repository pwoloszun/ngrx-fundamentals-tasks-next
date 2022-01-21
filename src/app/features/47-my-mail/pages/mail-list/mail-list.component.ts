import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewMessageDialogComponent } from '../../containers/new-message-dialog/new-message-dialog.component';
import { ExternalMessagesWebsocketService } from '../../services/external-messages-websocket.service';

@Component({
  selector: 'nts-mail-list',
  templateUrl: './mail-list.component.html',
})
export class MailListComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private messagesWebsocketService: ExternalMessagesWebsocketService
  ) { }

  openNewMessageHandler(): void {
    const dialogRef = this.dialog.open(NewMessageDialogComponent, {
      width: '400px',
    });
  }

  startWsHandler() {
    this.messagesWebsocketService.open();
  }

  stopWsHandler() {
    this.messagesWebsocketService.close();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.messagesWebsocketService.close();
  }

}
