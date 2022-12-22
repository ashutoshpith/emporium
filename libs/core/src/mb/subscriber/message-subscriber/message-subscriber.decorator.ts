import { MessageSubscriberMap } from './message-subscriber.map';

export function MessageSubscriberHandler(event: string) {
  return (target: any) => {
    MessageSubscriberMap.add(event, target);
  };
}
