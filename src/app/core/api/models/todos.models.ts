export interface Todo {
  id: number;
  title: string;
  description?: string;
}

export type TodoParams = Omit<Todo, 'id'>;

export const ITEM_STATUS = {
  persisted: 'PERSISTED',
  removing: 'REMOVING',
  saving: 'SAVING',
  editing: 'EDITING',
};
