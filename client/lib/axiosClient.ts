import { toast } from '@/hooks/use-toast';
import axios, { AxiosResponse } from 'axios';

const httpClient = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
});
const isBrowser = typeof window !== 'undefined';

httpClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  () => {
    throw new Error('Error');
  }
);

httpClient.interceptors.response.use(
  (
    data: AxiosResponse<{
      statusCode: number;
      message: string | null;
      data: any;
      success: boolean;
    }>
  ) => {
    const res = data.data;

    if (!res.success) {
      toast({
        title: res.message || 'Error',
        description: res.data,
        variant: 'destructive',
      });
      return null;
    }
    return res.data;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 400:
        case 404:
        case 504:
          isBrowser &&
            toast({
              title:
                (err.response && err.response.data && err.response.data.msg) ||
                'Error',
              variant: 'destructive',
            });
          break;

        default:
          isBrowser &&
            toast({
              title:
                (err.response && err.response.data && err.response.data.msg) ||
                'Error',
              variant: 'destructive',
            });
          break;
      }
      return Promise.reject({
        statusCode: err.response.status,
        message: err.response.data.msg,
      });
    }

    return Promise.reject(err);
  }
);

export default httpClient;
