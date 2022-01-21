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

export interface SliceState {
  // domain/entities state
  todos: TodoEntityState;

  // feature/app logic state
  isFetchingMany: boolean;
  todosStatuses: { [id: number]: TodoStatus; };
}

export const todoEntityAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: SliceState = {
  todos: todoEntityAdapter.getInitialState(),

  isFetchingMany: false,
  todosStatuses: {},
};

const todosReducer = createReducer(
  initialState,

  on(actions.loadManyTodosRequest, (state) => {
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.isFetchingMany = true;
    });
  }),
  on(actions.loadManyTodosSuccess, (state, { todos }) => {
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.isFetchingMany = false;
      draftState.todos = todoEntityAdapter.setAll(todos, state.todos);
    });
  }),

  on(actions.deleteSingleTodoRequest, (state, action) => {
    const { id } = action;
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.todosStatuses[id] = TodoStatus.Removing;
    });
  }),
  on(actions.deleteSingleTodoSuccess, (state, action) => {
    const { id } = action;
    return produce(state, (draftState: Draft<SliceState>) => {
      delete draftState.todosStatuses[id];
      draftState.todos = todoEntityAdapter.removeOne(id, state.todos);
    });
  }),

  on(actions.optimisticUpdateSingleTodoRequest, (state, action) => {
    const { todoUpdate } = action;
    const { id } = todoUpdate;
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.todosStatuses[id as number] = TodoStatus.Saving;
      draftState.todos = todoEntityAdapter.updateOne(todoUpdate, state.todos);
    });
  }),
  on(actions.optimisticUpdateSingleTodoSuccess, (state, action) => {
    const { todoUpdate } = action;
    const { id } = todoUpdate;
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.todosStatuses[id as number] = TodoStatus.Persisted;
      draftState.todos = todoEntityAdapter.updateOne(todoUpdate, state.todos);
    });
  }),

  on(actions.startEditSingleTodo, (state, { id }) => {
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.todosStatuses[id] = TodoStatus.Editing;
    });
  }),
  on(actions.endEditSingleTodo, (state, { id }) => {
    return produce(state, (draftState: Draft<SliceState>) => {
      draftState.todosStatuses[id] = TodoStatus.Persisted;
    });
  }),

  // on actions.createTodoRequest - DO NOTHING
  on(actions.createTodoSuccess, (state, action) => {
    const { todo } = action;
    const { id } = todo;
    return produce(state, (draftState) => {
      draftState.todosStatuses[id] = TodoStatus.Persisted;
      draftState.todos = todoEntityAdapter.addOne(todo, state.todos);
    });
  }),
);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return todosReducer(state, action);
}

// App slice STATE
export interface ApplicationState {
  [todosFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
