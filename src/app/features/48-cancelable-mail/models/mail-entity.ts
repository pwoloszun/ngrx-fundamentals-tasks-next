export enum MailStatus {
  Draft = 'DRAFT',
  Sent = 'SENT',
}

export interface MailEntity {
  id: number;
  title: string;
  to: string[];
  from: string;
  content: string;
  createdAt: number;
  status: MailStatus;
};

export type MailEntityParams = Omit<MailEntity, 'id'>;
