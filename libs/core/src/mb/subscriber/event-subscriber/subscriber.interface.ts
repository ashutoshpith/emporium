export interface IEventSubscriberCargo {
  id: string;
  payload: any;
  eventName: string;
  triggeredBy: string | any;
  createdAt: string;
  aggregateId: string;
  eventVersion: number;
}
export interface IEventSubscriberHandler {
  handle(payload: IEventSubscriberCargo): Promise<void>;
  request?(): Promise<void>;
}
