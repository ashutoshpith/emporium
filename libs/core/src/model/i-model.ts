import { IModelState } from './i-model-state';

export interface IModel<TState extends IModelState> {
  isNew: boolean;
  state: TState;
  createEntry(triggeredBy: string, input: any, reCreate: boolean): void;
  updateEntry?(triggeredBy: string, input: any): boolean;
  deleteEntry?(triggeredBy: string): void;
}
