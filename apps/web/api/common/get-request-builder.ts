import BaseApiBuilder from "./api-builder";

export class GetRequestBuilder<
  ResponseType,
> extends BaseApiBuilder<ResponseType> {
  sendRequest(): Promise<ResponseType> {
    return this.fetch("GET");
  }
}
