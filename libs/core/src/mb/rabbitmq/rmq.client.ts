import {
  ClientRMQ,
  ReadPacket,
  RmqOptions,
  RmqRecord,
  WritePacket,
} from '@nestjs/microservices';
import load_package_util_1 = require('@nestjs/common/utils/load-package.util');
import { EventEmitter } from 'events';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
export class RmqClient extends ClientRMQ {
  private readonly exchange: string;
  private readonly options_crpto: any;
  private readonly routeKey: string;

  constructor(options: RmqOptions['options'], public pattern: string) {
    super(options);

    this.options_crpto = options;
    this.queueOptions = this.options.queueOptions;

    this.exchange = this.getOptionsProp(
      this.options_crpto.queueOptions,
      'exchange',
    );
    this.routeKey = this.getOptionsProp(
      this.options_crpto.queueOptions,
      'routeKey',
    );

    load_package_util_1.loadPackage('amqplib', ClientRMQ.name, () =>
      require('amqplib'),
    );

    this.initializeSerializer(options);
    this.initializeDeserializer(options);
  }

  async consumeChannel() {
    this.logger.log('RMQ Consume Channel');

    const noAck = this.getOptionsProp(this.options, 'noAck', true);

    this.channel.addSetup(
      async (channel) =>
        await channel.consume(
          this.replyQueue,
          (msg) => this.responseEmitter.emit(msg.properties.correlationId, msg),
          {
            noAck,
          },
        ),
    );
  }

  async setupChannel(channel, resolve) {
    this.logger.log('RMQ Setup Channel');
    // create queues
    await channel.assertQueue(this.queue, this.queueOptions);
    await channel.prefetch(20, true);

    this.responseEmitter = new EventEmitter();
    this.responseEmitter.setMaxListeners(0);
    await this.consumeChannel();
    resolve();
  }

  dispatchEvent(packet: ReadPacket) {
    this.logger.log('Dispatch Event');

    const serializedPacket = this.serializer.serialize(packet);

    if (this.exchange) {
      return new Promise((resolve, reject) =>
        this.channel.publish(
          this.exchange,
          this.routeKey,
          Buffer.from(JSON.stringify(serializedPacket)),
          {},
          (err) => (err ? reject(err) : resolve(true)),
        ),
      );
    } else {
      return new Promise((resolve, reject) =>
        this.channel.sendToQueue(
          this.queue,
          Buffer.from(JSON.stringify(serializedPacket)),
          {
            persistent: this.persistent,
          },
          (err) => (err ? reject(err) : resolve(true)),
        ),
      );
    }
  }

  protected publish(
    message: ReadPacket,
    callback: (packet: WritePacket) => any,
  ): () => void {
    this.logger.log('Publish Message');
    try {
      const correlationId = randomStringGenerator();
      const listener = ({ content }: { content: any }) =>
        this.handleMessage(JSON.parse(content.toString()), callback);

      Object.assign(message, { id: correlationId });
      const serializedPacket: ReadPacket & Partial<RmqRecord> =
        this.serializer.serialize(message);

      const options = serializedPacket.options;
      delete serializedPacket.options;

      this.responseEmitter.on(correlationId, listener);

      this.channel.publish(
        this.exchange,
        this.routeKey,
        Buffer.from(JSON.stringify(serializedPacket)),
        {
          replyTo: this.replyQueue,
          persistent: this.persistent,
          ...options,
          headers: this.mergeHeaders(options?.headers),
          correlationId,
        },
      );
      return () => this.responseEmitter.removeListener(correlationId, listener);
    } catch (err) {
      callback({ err });
    }
  }
}
