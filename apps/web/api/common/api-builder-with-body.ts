import BaseApiBuilder from "./api-builder";

export abstract class ApiBuilderWithBody<
  ResponseType,
  RequestBodyType,
> extends BaseApiBuilder<ResponseType> {
  private setBody(body: BodyInit) {
    this.body = body;
    return this;
  }

  withBody(body: RequestBodyType) {
    this.setHeader("Content-Type", "application/json");
    this.setHeader("Accept", "application/json");
    //@TODO set this to same-site in production
    this.setHeader("Origin", "*");
    return this.setBody(JSON.stringify(body));
  }
}
