export interface MessageEntity {
  id: number;
  title: string;
  content?: string;
  categoryId: number;
  createdAt: string;
}

export type MessageParams = Omit<MessageEntity, 'id'>;

export interface CategoryEntity {
  id: number;
  text: string;
  value: string;
}
