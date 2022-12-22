import { RmqOptions, ServerRMQ } from '@nestjs/microservices';

export class RmqServer extends ServerRMQ {
  private readonly exchange: string;
  private readonly options_crpto: any;
  private readonly routeKey: string;
  private readonly exchangeType: string;
  readonly queueOptions: any; // for server part only
  constructor(options: RmqOptions['options']) {
    super(options);

    this.options_crpto = options;
    this.queueOptions = this.options.queueOptions;
    this.exchangeType = this.getOptionsProp(
      this.options_crpto.queueOptions,
      'exchangeType',
    );
    this.exchange = this.getOptionsProp(
      this.options_crpto.queueOptions,
      'exchange',
    );
    this.routeKey = this.getOptionsProp(
      this.options_crpto.queueOptions,
      'routeKey',
    );
  }

  async setupChannel(channel: any, callback: any) {
    this.logger.log('Rmq Setup Channel');
    const noAck = this.getOptionsProp(this.queueOptions, 'noAck');
    // create queues
    await channel.assertQueue(this.queue, this.queueOptions);
    if (this.exchange && this.exchangeType) {
      // create exchange
      await channel.assertExchange(this.exchange, this.exchangeType, {
        durable: true,
      });
    }
    await channel.bindQueue(this.queue, this.exchange, this.routeKey);
    await channel.prefetch(20, true);
    channel.consume(
      this.queue,
      (msg: any) => this.handleMessage(msg, channel),
      {
        noAck,
      },
    );
    callback();
  }
}
