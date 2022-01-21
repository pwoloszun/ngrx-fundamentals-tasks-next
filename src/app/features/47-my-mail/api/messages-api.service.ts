import { Injectable } from '@angular/core';

import { DataApiService } from '@api/data-api.service';

import { MessageEntity } from '../store/my-mail.models';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService extends DataApiService<MessageEntity> {

  getUrl(): string {
    return '/api/messages';
  }

}
