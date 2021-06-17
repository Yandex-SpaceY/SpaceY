export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Headers = {
  Accept: string,
  Pragma: string,
  enctype?: string,
  'Content-Type'?: string,
}

export type Result = {
  error: Record<string, unknown> | string | null,
  data: Record<string, unknown> | string | null,
}

const defineApiHeaders = (isUpload?: boolean) => {
  const headers: Headers = {
    Accept: '*/*',
    Pragma: 'no-cache',
  };

  isUpload
    ? (headers['enctype'] = 'multipart/form-data')
    : (headers['Content-Type'] = 'application/json');

  return headers;
};

const getResponseBody = (response: Response) => (
  response.headers.get('Content-Type')?.includes('application/json') ? response.json() : response.text()
);

export const api = async (
  url: string,
  method: METHODS = METHODS.GET,
  body?: BodyInit,
  isUpload = false,
): Promise<Result> => {
  const result = { error: null, data: null };

  const response: Response = await fetch(url, {
    method,
    headers: defineApiHeaders(isUpload),
    body
  });

  if (response.status === 200) {
    result.data = await getResponseBody(response);
  } else {
    result.error = await getResponseBody(response);
  }

  return result;
};
