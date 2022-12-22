export interface TKafka {
  message?: string;
  name?: string;
  clientId?: string;
  groupId?: string;
  brokerId?: string[];
  topic?: string;
  providers?: any[];
}
