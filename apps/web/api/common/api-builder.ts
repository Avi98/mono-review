import { UnAuthorizedError } from "./error";

abstract class BaseApiBuilder<ResponseType> {
  private targetUrl: string;
  private headers = new Headers();
  protected body?: BodyInit;

  constructor(endpoint: string, baseUrl: string) {
    const baseStartWith = baseUrl.startsWith("/") ? endpoint : `/${endpoint}`;
    this.targetUrl = `${baseUrl ?? "/"}${baseStartWith}`;
  }

  setHeader(name: string, value: string) {
    this.headers.set(name, value);
    return this;
  }

  protected async fetch(
    httpMethods: RequestInit["method"]
  ): Promise<ResponseType> {
    return await fetch(this.targetUrl, {
      method: httpMethods,
      headers: this.headers,
      body: this.body,
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          const errorObj = JSON.parse(error);
          throw new UnAuthorizedError(errorObj);
        }
        if (res.ok) return res.json();
      })
      .then((res) => res)
      .catch((error) => {
        if (error instanceof UnAuthorizedError) {
          throw error;
        }
        throw new Error(error.message || "Something went wrong");
      });
  }

  abstract sendRequest(): Promise<ResponseType>;
}
export default BaseApiBuilder;
