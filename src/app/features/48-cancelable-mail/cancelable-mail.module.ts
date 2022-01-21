import { MatDialog } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';

import * as fromCancelableMail from './store/cancelable-mail.reducer';
import { CancelableMailEffects } from './store/cancelable-mail.effects';

import { CancelableMailRoutingModule } from './cancelable-mail-routing.module';
import { CancelabMailPageComponent } from './pages/cancelab-mail-page/cancelab-mail-page.component';
import { CreateDraftMessageButtonComponent } from './contaiers/create-draft-message-button/create-draft-message-button.component';
import { MailDialogComponent } from './components/mail-dialog/mail-dialog.component';

@NgModule({
  declarations: [
    CancelabMailPageComponent,
    CreateDraftMessageButtonComponent,
    MailDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CancelableMailRoutingModule,
    StoreModule.forFeature(fromCancelableMail.cancelableMailFeatureKey, fromCancelableMail.reducer),
    EffectsModule.forFeature([CancelableMailEffects])
  ],
  providers: [
    MatDialog
  ],
  entryComponents: [
    MailDialogComponent
  ]
})
export class CancelableMailModule { }
