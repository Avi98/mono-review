import { ApiBuilderWithBody } from "./api-builder-with-body";

export class PatchRequestBuilder<
  ResponseType,
  ResponseBodyType,
> extends ApiBuilderWithBody<ResponseType, ResponseBodyType> {
  sendRequest(): Promise<ResponseType> {
    return this.fetch("PATCH");
  }
}
