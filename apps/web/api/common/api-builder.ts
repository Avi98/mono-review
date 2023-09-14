import { UnAuthorizedError } from "./error";

abstract class BaseApiBuilder<ResponseType> {
  private targetUrl: string;
  private headers = new Headers();
  protected body: BodyInit;

  constructor(endpoint: string, baseUrl: string) {
    const baseStartWith = baseUrl.startsWith("/") ? endpoint : `/${endpoint}`;
    this.targetUrl = `${baseUrl ?? "/"}${baseStartWith}`;
    this.body = body;
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
      .then((res) => res.json())
      .catch((error) => {
        if (error.status === 401) {
          throw new UnAuthorizedError("Unauthorized response");
        }
        throw error;
      });
  }

  abstract sendRequest(): Promise<ResponseType>;
}
export default BaseApiBuilder;
