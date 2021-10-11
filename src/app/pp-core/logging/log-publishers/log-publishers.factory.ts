import { ConsoleLogPublisher } from './console-log-publisher.class';
import { LogPublisher } from './log-publisher.class';

export class LogPublishersFactory {

  private publishers: LogPublisher[] = [];

  constructor() { }

  createPublishers(): LogPublisher[] {
    this.publishers.push(new ConsoleLogPublisher());
    return this.publishers
  }
}
