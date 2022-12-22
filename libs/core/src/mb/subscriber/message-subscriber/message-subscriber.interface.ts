export interface IMessageSubscriberEventCargo {
  id: string;
  payload: any;
  eventName: string;
  triggeredBy: string | any;
  createdAt: string;
  aggregateId: string;
  eventVersion: number;
}

export interface IMessageSubscriberEventHandler {
  handle(payload: IMessageSubscriberEventCargo): Promise<any>;
  request?(): Promise<any>;
}
