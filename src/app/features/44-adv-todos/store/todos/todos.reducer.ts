import { produce, Draft } from 'immer';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Todo } from '@api/models/todos.models';

import * as actions from './todos.actions';

export const todosFeatureKey = 'todosFeature';

interface TodoEntityState extends EntityState<Todo> {
}

export enum TodoStatus {
  Persisted = 'PERSISTED',
  Saving = 'SAVING',
  Removing = 'REMOVING',
  Editing = 'EDITING',
}

// TODO: design state shape
export interface SliceState {
  // TODO
  gggHhh: number;
}

export const initialState: SliceState = {
  // TODO
  gggHhh: 123,
};

const todosReducer = createReducer(
  initialState,

  on(actions.loadManyTodosRequest, (state) => {
    // TODO
    return state;
  }),

  on(actions.loadManyTodosSuccess, (state, action) => {
    // TODO
    return state;
  }),

  on(actions.deleteSingleTodoRequest, (state, action) => {
    // TODO
    return state;
  }),

  on(actions.deleteSingleTodoSuccess, (state, action) => {
    // TODO
    return state;
  }),

  // on actions.createTodoRequest - DO NOTHING
  on(actions.createTodoSuccess, (state, action) => {
    // TODO
    return state;
  }),
);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return todosReducer(state, action);
}

// App slice STATE
export interface ApplicationState {
  [todosFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
