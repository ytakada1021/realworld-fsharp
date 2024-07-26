import { components, paths } from "@/generated/apiSchema";
import type { UnionToIntersection } from "type-fest";

export type ApiPaths = keyof paths;

export type HttpMethods = keyof UnionToIntersection<paths[keyof paths]>;

export type ExactHttpMethodByPath<T extends ApiPaths> = HttpMethods & keyof UnionToIntersection<paths[T]>;

export type ExactPathByHttpMethod<U extends HttpMethods> = U extends unknown
  ? keyof {
      [K in keyof paths as paths[K] extends Record<U, unknown> ? K : never]: paths[K];
    }
  : never;

type GetNestedValue<T extends Record<string, any>, Keys extends (string | number)[]> = 0 extends Keys["length"]
  ? T
  : Keys extends [infer First, ...infer Rest]
    ? First extends keyof T
      ? Rest extends (string | number)[]
        ? GetNestedValue<Required<T[First]>, Rest>
        : never
      : never
    : never;

type GetContent<T extends ApiPaths, U extends HttpMethods, R extends number> = GetNestedValue<
  paths,
  [T, U, "responses", R, "content", "application/json"]
>;

export const httpSuccessStatusCode = [200, 201, 204] as const;

export type HttpSuccessCode = (typeof httpSuccessStatusCode)[number];

export type ApiResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<T, U, HttpSuccessCode>;

export type ApiUnprocessableEntityErrorResponse = GetNestedValue<components, ["schemas", "GenericErrorModel"]>;

export type ApiErrorResponse = ApiUnprocessableEntityErrorResponse;

export type ApiPathParam<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "parameters", "path"]
>;

export type ApiQueryParam<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "parameters", "query"]
>;

export type ApiJsonBody<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "requestBody", "content", "application/json"]
>;
