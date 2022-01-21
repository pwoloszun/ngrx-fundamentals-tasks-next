import { createFeatureSelector, createSelector } from '@ngrx/store';
import { indexOf, orderBy } from 'lodash';

import { categoryAdapter, myMailFeatureKey, State, messageAdapter, CategoriesStatsMap, MessagesByCategoryMap } from './my-mail.reducer';
import { MessageEntity } from './my-mail.models';

export const selectFeatureSlice = createFeatureSelector<State>(myMailFeatureKey);

const categorySelectors = categoryAdapter.getSelectors();

export const selectCategories = createSelector(
  selectFeatureSlice,
  (state: State) => categorySelectors.selectAll(state.categories)
);

const selectCategoryEntities = createSelector(
  selectFeatureSlice,
  (state: State) => categorySelectors.selectEntities(state.categories)
);

const selectCategoryIds = createSelector(
  selectFeatureSlice,
  (state: State) => categorySelectors.selectIds(state.categories) as number[]
);

export const selectCurrentCategoryId = createSelector(
  selectFeatureSlice,
  (state: State) => state.currentCategoryId
);

export const selectCurrentCategoryIndex = createSelector(
  [selectCategoryIds, selectCurrentCategoryId],
  (ids: number[], currId: number | null) => {
    const index = indexOf(ids, currId);
    return index > -1 ? index : null;
  }
);

const selectNotCurrentCategoryIds = createSelector(
  [selectCategoryIds, selectCurrentCategoryId],
  (ids: number[], currentCategoryId: number | null) => {
    return ids.filter((id) => id !== currentCategoryId);
  }
);

export const selectNotCurrentCategories = createSelector(
  selectNotCurrentCategoryIds,
  selectCategoryEntities,
  (ids: number[], categoriesMap) => ids.map((id) => categoriesMap[id])
);



const messageSelectors = messageAdapter.getSelectors();

const selectMessageEntities = createSelector(
  selectFeatureSlice,
  (state: State) => messageSelectors.selectEntities(state.messages)
);

const selectMessages = createSelector(
  selectFeatureSlice,
  (state: State) => messageSelectors.selectAll(state.messages)
);

export const selectMessagesSorted = createSelector(
  selectMessages,
  (messages: MessageEntity[]) => orderBy(messages, ['createdAt'], ['desc'])
);

export const selectMessagesByCategory = createSelector(
  selectMessagesSorted,
  (messages: MessageEntity[], props: { categoryId: number }) => {
    return messages.filter((m) => m.categoryId === props.categoryId);
  }
);

export const selectCategoryTotalCount = createSelector(
  selectMessagesByCategory,
  (msgs, props: { categoryId: number }) => msgs.length
);

export const selectMessagesLoadedAt = createSelector(
  selectFeatureSlice,
  (state: State) => state.messagesLoadedAt
);

const getSelectedMsgsByCategoryMap = createSelector(
  selectFeatureSlice,
  (state: State) => state.selectedMessagesByCategory
);

export const getSelectedMessagesByCategory = createSelector(
  [getSelectedMsgsByCategoryMap],
  (messagesByCategory: MessagesByCategoryMap, props: { categoryId: number }) =>
    messagesByCategory[props.categoryId]
);

export const getSelectedMessagesInCurrentCategory = createSelector(
  getSelectedMsgsByCategoryMap,
  selectCurrentCategoryId,
  (messagesByCategory, currentCategoryId) => currentCategoryId === null ? [] : messagesByCategory[currentCategoryId]
);

export const hasSelectedMessagesInCurrentCategory = createSelector(
  getSelectedMessagesInCurrentCategory,
  (selectedMessagesIds) => selectedMessagesIds.length > 0
);

// details
export const selectNextMessageId = createSelector(
  selectFeatureSlice,
  (state: State) => state.messageDetails.nextMessageId
);

export const selectPrevMessageId = createSelector(
  selectFeatureSlice,
  (state: State) => state.messageDetails.prevMessageId
);

export const hasNextMessage = createSelector(
  selectNextMessageId,
  (id) => id !== null
);

export const hasPrevMessage = createSelector(
  selectPrevMessageId,
  (id) => id !== null
);

const selectCurrentMessageId = createSelector(
  selectFeatureSlice,
  (state: State) => state.messageDetails.currentMessageId
);

export const selectCurrentMessageEntity = createSelector(
  [selectMessageEntities, selectCurrentMessageId],
  (messagesMap, id) => id === null ? null : messagesMap[id]
);

// categories stats
const selectCatgoriesStatsMap = createSelector(
  selectFeatureSlice,
  (state: State) => state.categoriesStats
);

export const selectCategoryUnreadCount = createSelector(
  selectCatgoriesStatsMap,
  (categoriesStatsMap: CategoriesStatsMap, props: { categoryId: number }) => {
    const stats = categoriesStatsMap[props.categoryId];
    return stats ? stats.unreadCount : 0;
  }
);
