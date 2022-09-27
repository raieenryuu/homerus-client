import axios, { AxiosResponse } from "axios";

export type QueryResponse<T> = [error: string | null, data: T | null];

export const refreshTokens = async () => {
  const response = await axios.post(
    `http://localhost:8000/api/user/refresh`,
    undefined,
    {
      withCredentials: true,
    }
  );
};

const handleRequest = async (
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error: any) {
    if (error.response.request.status == 401) {
      await refreshTokens();
      return await request();
    }

    throw error;
  }
};

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, { withCredentials: true });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};

export const post = async <T>(
  url: string,
  values: any
): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.post(url, values, { withCredentials: true });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};
