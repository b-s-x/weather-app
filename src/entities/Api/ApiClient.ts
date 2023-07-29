import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export class ApiClient {
  private apiClient: AxiosInstance;

  constructor () {
    this.apiClient = axios.create({})
  }

  get<T = any, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
    return this.apiClient.get<T, R>(url, params);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, params?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.apiClient.post<T, R>(url, params, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
    return this.apiClient.delete<T, R>(url, params);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
    return this.apiClient.put<T, R>(url, params);
  }
}