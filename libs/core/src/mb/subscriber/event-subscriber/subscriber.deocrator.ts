import { EventSubscriberMap } from './subscriber.map';

export function EventSubscriberHandler(event: string) {
  return (target: any) => {
    EventSubscriberMap.add(event, target);
  };
}
