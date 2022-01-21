import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';

import { MyMailRoutingModule } from './my-mail-routing.module';
import { MailListComponent } from './pages/mail-list/mail-list.component';
import { MessageFilterListComponent } from './containers/message-filter-list/message-filter-list.component';
import { MessageByCategoryTabsComponent } from './containers/message-by-category-tabs/message-by-category-tabs.component';
import { MessageListComponent } from './components/message-list/message-list.component';

import * as myMailStore from './store';
import { MyMailEffects } from './store/my-mail.effects';
import { MailContextMenuComponent } from './containers/mail-context-menu/mail-context-menu.component';
import { NewMessageDialogComponent } from './containers/new-message-dialog/new-message-dialog.component';
import { MailDetailsComponent } from './pages/mail-details/mail-details.component';

@NgModule({
  declarations: [
    MailListComponent,
    MessageFilterListComponent,
    MessageByCategoryTabsComponent,
    MessageListComponent,
    MailContextMenuComponent,
    NewMessageDialogComponent,
    MailDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatDialogModule,
    FormsModule,

    SharedModule,
    MyMailRoutingModule,
    // store
    StoreModule.forFeature(myMailStore.myMailFeatureKey, myMailStore.sliceReducer),
    EffectsModule.forFeature([MyMailEffects])
  ],
  entryComponents: [
    NewMessageDialogComponent
  ]
})
export class MyMailModule { }
