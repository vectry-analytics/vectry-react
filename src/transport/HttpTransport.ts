import { ITransport, VectryConfig } from '@vectry/js-core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * HttpTransport
 *
 * Concrete transport for React environments using Axios.
 */
export class HttpTransport implements ITransport {
  private client: AxiosInstance;

  constructor(config: Partial<VectryConfig>) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  private async request(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, payload?: any): Promise<any> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
    };

    if (['GET', 'DELETE'].includes(method) && payload) {
      config.params = payload;
    } else if (payload) {
      config.data = payload;
    }

    const response = await this.client.request(config);
    return response.data;
  }

  async get(path: string, payload?: any): Promise<any> {
    return this.request('GET', path, payload);
  }

  async post(path: string, payload?: any): Promise<any> {
    return this.request('POST', path, payload);
  }

  async put(path: string, payload?: any): Promise<any> {
    return this.request('PUT', path, payload);
  }

  async patch(path: string, payload?: any): Promise<any> {
    return this.request('PATCH', path, payload);
  }

  async delete(path: string, payload?: any): Promise<any> {
    return this.request('DELETE', path, payload);
  }
}
