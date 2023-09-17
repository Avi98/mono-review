import BaseApiBuilder from "./api-builder";

export class DeleteRequestBuilder<ResponseType> extends BaseApiBuilder<ResponseType>{
	sendRequest(): Promise<ResponseType> {
		return this.fetch('DELETE')
	}
}