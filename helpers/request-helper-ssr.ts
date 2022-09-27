import axios, { AxiosResponse } from "axios";
import { IncomingMessage, Server, ServerResponse } from "http";
import { getError } from "./error";
import { QueryResponse } from "./requests-helper";

const SET_COOKIE_HEADER = "set-cookie";

const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.post(
    "http://localhost:8000/api/user/refresh",
    undefined,
    {
      headers: { cookie: req.headers.cookie as string },
    }
  );

  const cookies = response.headers[SET_COOKIE_HEADER] as string | undefined;

  req.headers.cookie = cookies;

  res.setHeader(SET_COOKIE_HEADER, cookies as string);
};

const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  request: () => Promise<AxiosResponse>
) => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        await refreshTokens(req, res);
        return await request();
      } catch (innerError: any) {
        throw getError(innerError);
      }
    }

    throw getError(error);
  }
};

export const fetcherSSR = async <T>(
  req: IncomingMessage,
  res: ServerResponse,
  url: string
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      axios.get(url, { headers: { cookie: req.headers.cookie as string } });
    const { data } = await handleRequest(req, res, request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};
