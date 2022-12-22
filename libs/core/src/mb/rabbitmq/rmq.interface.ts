export interface IRmq {
  queueName?: string;
  ack?: boolean;
  durable?: boolean;
  exchange?: string;
  routeKey?: string;
  exchangeType?: 'fanout' | 'direct' | 'topic';
  pattern?: string;
}
