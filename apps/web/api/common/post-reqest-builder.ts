import BaseApiBuilder from "./api-builder";
import { ApiBuilderWithBody } from "./api-builder-with-body";

export class PostRequestBuilder<
  ResponseType,
  ResponseBodyType,
> extends ApiBuilderWithBody<ResponseType, ResponseBodyType> {
  sendRequest(): Promise<ResponseType> {
    return this.fetch("POST");
  }
}
