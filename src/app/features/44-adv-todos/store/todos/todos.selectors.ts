import { map } from 'lodash';
import { createSelector } from '@ngrx/store';

import { ITEM_STATUS } from '@api/models/todos.models';

import { ApplicationState, todosFeatureKey, TodoStatus } from './todos.reducer';

// const todoAdapterSelectors = todoEntityAdapter.getSelectors();

const selectFeature = (state: ApplicationState) => state[todosFeatureKey];

// TODO


// export const selectTodosStatusesAll = createSelector(
//   selectTodosIds,
//   selectTodosStatusesMap,
//   (ids, statusesMap) => {
//     return map(ids as number[], (id: number) => {
//       const status = statusesMap[id];
//       if (status === TodoStatus.Removing) {
//         return ITEM_STATUS.removing;
//       } else if (status === TodoStatus.Editing) {
//         return ITEM_STATUS.editing;
//       } else if (status === TodoStatus.Saving) {
//         return ITEM_STATUS.saving;
//       } else { // persisted or null
//         return ITEM_STATUS.persisted;
//       }
//     });
//   },
// );
