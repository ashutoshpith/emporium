import { RmqContext } from '@nestjs/microservices';

export function messageAcknolgement(ctx: RmqContext) {
  const channel = ctx.getChannelRef();
  const originalMsg = ctx.getMessage();

  channel.ack(originalMsg);
  return originalMsg;
}
