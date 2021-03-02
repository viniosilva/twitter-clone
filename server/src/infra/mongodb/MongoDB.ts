import { Connection, createConnection } from 'mongoose';

export default class MongoDB {
  readonly conn: Connection;

  constructor(url: string, dbName: string) {
    this.conn = createConnection(url, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  isConnected(): boolean {
    return [1, 2].includes(this.conn.readyState);
  }

  async disconnect(): Promise<void> {
    await this.conn.close();
  }
}
