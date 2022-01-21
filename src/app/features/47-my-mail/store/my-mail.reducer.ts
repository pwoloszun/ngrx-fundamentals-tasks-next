import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { produce } from 'immer';
import { reduce } from 'lodash';

import * as MyMailActions from './my-mail.actions';
import { CategoryEntity, MessageEntity } from './my-mail.models';

export const myMailFeatureKey = 'myMail';

// private details
export interface MessagesByCategoryMap {
  [categoryId: number]: number[];
}

interface MessageCategoryStats {
  unreadCount: number;
}

export interface CategoriesStatsMap {
  [categoryId: number]: MessageCategoryStats;
}

// state shape
export interface State {
  categories: EntityState<CategoryEntity>;
  messages: EntityState<MessageEntity>;
  messagesLoadedAt: number | null;
  currentCategoryId: number | null;
  selectedMessagesByCategory: MessagesByCategoryMap;

  messageDetails: {
    currentMessageId: number | null;
    nextMessageId: number | null;
    prevMessageId: number | null;
  };

  categoriesStats: CategoriesStatsMap;
}

export const categoryAdapter = createEntityAdapter<CategoryEntity>();
export const messageAdapter = createEntityAdapter<MessageEntity>();

export const initialState: State = {
  categories: categoryAdapter.getInitialState(),
  messages: messageAdapter.getInitialState(),

  messagesLoadedAt: null,

  currentCategoryId: null,
  selectedMessagesByCategory: {},

  // details
  messageDetails: {
    currentMessageId: null,
    nextMessageId: null,
    prevMessageId: null,
  },

  categoriesStats: {
  },
};

export const sliceReducer = createReducer(
  initialState,

  on(MyMailActions.loadMyMailDataRequest, state => state),
  on(MyMailActions.loadCategoriesSuccess, (state, action) => {
    const { categories } = action;
    return produce(state, (draftState) => {
      draftState.categories = categoryAdapter.addMany(categories, state.categories);
      draftState.currentCategoryId = categories[0].id;
    });
  }),
  // TODO error handling

  on(MyMailActions.loadMessagesSuccess, (state, action) => {
    const { messages, loadedAt } = action;
    return produce(state, (draftState) => {
      draftState.messages = messageAdapter.addMany(messages, state.messages);
      draftState.messagesLoadedAt = loadedAt;

      draftState.categoriesStats = reduce(draftState.messages.entities, (memo, message) => {
        const { categoryId } = message as MessageEntity;
        if (!memo[categoryId]) {
          memo[categoryId] = { unreadCount: 0 };
        }
        memo[categoryId].unreadCount += 1;
        return memo;
      }, {} as CategoriesStatsMap);
    });
  }),
  // TODO handle error

  on(MyMailActions.createMessageSuccess, (state, action) => {
    return produce(state, (draftState) => {
      const { message } = action;
      draftState.messages = messageAdapter.addOne(message, state.messages);
      const { categoryId } = message;
      draftState.categoriesStats[categoryId].unreadCount += 1;
    });
  }),

  on(MyMailActions.changeMessageCategoryRequest, (state, action) => {
    return produce(state, (draftState) => {
      const { messageIds, categoryId } = action;
      const updates: Update<MessageEntity>[] = messageIds.map((id) => {
        return { id, changes: { categoryId } };
      });
      draftState.messages = messageAdapter.updateMany(updates, state.messages);
      const { currentCategoryId } = state;
      if (currentCategoryId != null) {
        delete draftState.selectedMessagesByCategory[currentCategoryId];
      }
    });
  }),

  on(MyMailActions.selectCategoryMessages, (state, action) => {
    return produce(state, (draftState) => {
      const { categoryId, messageIds } = action;
      draftState.selectedMessagesByCategory[categoryId] = messageIds;
    });
  }),

  on(MyMailActions.changeCategoryByIndex, (state, action) => {
    return produce(state, (draftState) => {
      const { index } = action;
      const ids = state.categories.ids as number[];
      const categoryId = ids[index];
      draftState.currentCategoryId = categoryId;
      if (draftState.categoriesStats[categoryId]) {
        draftState.categoriesStats[categoryId].unreadCount = 0;
      }
    });
  }),

  // details
  on(MyMailActions.showMessageDetailsSuccess, (state, action) => {
    const { currentMessageId, nextMessageId, prevMessageId } = action;
    return produce(state, (draftState) => {
      draftState.messageDetails.currentMessageId = currentMessageId;
      draftState.messageDetails.nextMessageId = nextMessageId;
      draftState.messageDetails.prevMessageId = prevMessageId;
    });
  }),
);

export interface SliceState {
  [myMailFeatureKey]: State; // IMPORTANT: prop name must equal featureName
}
