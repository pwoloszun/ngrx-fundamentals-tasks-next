export interface CounterValue {
  id: number;
  value: number;
}

export type CounterValueParams = Omit<CounterValue, 'id'>;
