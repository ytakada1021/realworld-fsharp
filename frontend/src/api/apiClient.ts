import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  ApiJsonBody,
  ApiPathParam,
  ApiPaths,
  ApiQueryParam,
  ApiResponse,
  ApiUnprocessableEntityErrorResponse,
  HttpMethods,
} from "@/api/types";
import { getSessionData } from "@/features/auth/session";

type CreateApiClientParams<T extends ApiPaths, U extends HttpMethods> = {
  path: T;
  httpMethod: U;
  params?: {
    paths?: ApiPathParam<T, U>;
    query?: ApiQueryParam<T, U>;
    body?: ApiJsonBody<T, U>;
  };
};

const buildPathString = <T extends ApiPaths, U extends HttpMethods>(params: CreateApiClientParams<T, U>) => {
  // replace path param placeholders to actual values
  const fullPath = Object.entries(params.params?.paths ?? {}).reduce(
    (prev, [key, value]) => prev.replace(new RegExp(`\\{${key}\\}`), String(value)),
    params.path as string,
  );

  const searchParam = new URLSearchParams();
  Object.entries(params.params?.query ?? {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      searchParam.set(key, value);
    }
  });

  if (searchParam.toString().length > 0) {
    return fullPath + "?" + searchParam.toString();
  } else {
    return fullPath;
  }
};

export const createApiClient = <T extends ApiPaths, U extends HttpMethods>(params: CreateApiClientParams<T, U>) => {
  const path = buildPathString(params);
  const token = getSessionData()?.authUser.token;

  const sendRequest = (): Promise<ApiResponse<T, U>> =>
    axios
      .request<ApiResponse<T, U>>({
        method: params.httpMethod,
        url: path,
        data: params.params?.body,
        headers: {
          Authorization: token,
        },
      })
      .then((response) => response.data);

  return { path, sendRequest };
};

export const isUnauthorizedError = (error: unknown): boolean => isAxiosError(error) && error.response?.status === 401;

export const isForbiddenError = (error: unknown): boolean => isAxiosError(error) && error.response?.status === 403;

export const isUnprocessableEntityError = (error: unknown): error is ApiUnprocessableEntityErrorResponse =>
  isAxiosError(error) && error.response?.status === 422;

export const isInternalServerError = (error: unknown): boolean => isAxiosError(error) && error.response?.status === 500;
