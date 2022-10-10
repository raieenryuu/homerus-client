import axios, { AxiosResponse, AxiosError } from "axios";

export type QueryResponse<T> = [
  error: AxiosError<{ message: string }> | null,
  data: T | null
];
const BASE_URL = "http://localhost:8000/api";

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
    const request = () =>
      axios.get(url, { withCredentials: true, baseURL: BASE_URL });
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
    const request = () =>
      axios.post(url, values, { withCredentials: true, baseURL: BASE_URL });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};

export const put = async <T>(
  url: string,
  values: any
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      axios.put(url, values, { withCredentials: true, baseURL: BASE_URL });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};

export const deleteResource = async <T>(
  url: string
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      axios.delete(url, {
        withCredentials: true,
        baseURL: BASE_URL,
      });

    console.log(`Essa é a URL: ${url}`);
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};
