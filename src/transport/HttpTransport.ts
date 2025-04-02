import { ITransport, VectryConfig } from "@vectry/js-core";
import axios, { AxiosInstance } from "axios";

/**
 * HttpTransport
 *
 * Concrete transport for Node.js environments using Axios.
 */
export class HttpTransport implements ITransport {
  private client: AxiosInstance;

  constructor(config: Partial<VectryConfig>) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async send(path: string, payload: any): Promise<void> {
    await this.client.post(path, payload);
  }

  async flush(): Promise<void> {
    // Optional, no batching implemented for now.
  }
}
