import { createAction, props } from '@ngrx/store';

import { MessageEntity, CategoryEntity, MessageParams } from './my-mail.models';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

enum MyMailActionTypes {
  LoadMyMailDataRequest = '[MyMail] Load MyMail data Request',

  LoadCategoriesSuccess = '[MyMail] Load Categories Success',
  LoadCategoriesError = '[MyMail] Load Categories Error',

  LoadMessagesSuccess = '[MyMail] Load Messages Success',
  LoadMessagesError = '[MyMail] Load Messages Error',

  CreateMessageRequest = '[MyMail] CreateMessage Request',
  CreateMessageSuccess = '[MyMail] CreateMessage Success',
  CreateMessageError = '[MyMail] CreateMessage Error',

  ChangeMessageCategoryRequest = '[MyMail] Change Message Category Request',
  ChangeMessageCategorySuccess = '[MyMail] Change Message Category Success',
  ChangeMessageCategoryError = '[MyMail] Change Message Category Error',

  SelectCategoryMessages = '[MyMail] Select Category Messages',
  ChangeCategoryByIndex = '[MyMail] Change Category By Index',

  ShowMessageDetailsRequest = '[MyMail] ShowMessageDetails Request',
  ShowMessageDetailsSuccess = '[MyMail] ShowMessageDetails Success',
  ShowMessageDetailsError = '[MyMail] ShowMessageDetails Error',

}

export const loadMyMailDataRequest = createAction(
  MyMailActionTypes.LoadMyMailDataRequest
);

export const loadCategoriesSuccess = createAction(
  MyMailActionTypes.LoadCategoriesSuccess,
  props<{ categories: CategoryEntity[] }>()
);

export const loadMessagesSuccess = createAction(
  MyMailActionTypes.LoadMessagesSuccess,
  (messages: MessageEntity[], loadedAt = Date.now()) => ({ messages, loadedAt })
);

export const loadMessagesError = createAction(
  MyMailActionTypes.LoadMessagesError,
  props<{ error: Error }>()
);

export const createMessageRequest = createAction(
  MyMailActionTypes.CreateMessageRequest,
  props<{ messageParams: MessageParams }>()
);

export const createMessageSuccess = createAction(
  MyMailActionTypes.CreateMessageSuccess,
  props<{ message: MessageEntity }>()
);

export const createMessageError = createAction(
  MyMailActionTypes.CreateMessageError,
  props<{ error: Error }>()
);

export const changeMessageCategoryRequest = createAction(
  MyMailActionTypes.ChangeMessageCategoryRequest,
  props<{ messageIds: number[]; categoryId: number; }>()
);

export const changeMessageCategorySuccess = createAction(
  MyMailActionTypes.ChangeMessageCategorySuccess,
  props<{ message: MessageEntity; }>()
);

export const changeMessageCategoryError = createAction(
  MyMailActionTypes.ChangeMessageCategoryError,
  props<{ error: Error }>()
);

export const selectCategoryMessages = createAction(
  MyMailActionTypes.SelectCategoryMessages,
  props<{ categoryId: number, messageIds: number[] }>()
);

export const changeCategoryByIndex = createAction(
  MyMailActionTypes.ChangeCategoryByIndex,
  props<{ index: number }>()
);

// details
export const showMessageDetailsRequest = createAction(
  MyMailActionTypes.ShowMessageDetailsRequest,
  (id: string) => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error(`Unknown Message id: ${id}`);
    }
    return { id: parsedId };
  }
);

export const showMessageDetailsSuccess = createAction(
  MyMailActionTypes.ShowMessageDetailsSuccess,
  props<{ currentMessageId: number; nextMessageId: number; prevMessageId: number; }>()
);
