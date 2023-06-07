import { env } from '$env/dynamic/private';

export type QueryParams = {
  readonly [k: string]: string | number | boolean | null;
}

export const fromApi = (route: string, params?: QueryParams) => {
  const join = (params: QueryParams) => Object.entries(params)
    .filter(([, v]) => v !== null)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return `${env.API_URL}/${route}${params ? `?${join(params)}` : ''}`;
}

export const withToken = (token: string, init?: RequestInit) => (
  {
    ...init,
    headers: {
      ...init?.headers,
      'Authorization': `Bearer ${token}`
    }
  }
);
