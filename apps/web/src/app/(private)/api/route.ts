import { cookies } from "next/headers";
import { GetRequestBuilder } from "../../../../api/common/get-request-builder";
import { SERVER_ENDPOINT } from "../../../../api/utils/contants";
import { User } from "../../../interfaces/IUserResponse";

async function getCurrentUser() {
  const getRequest = new GetRequestBuilder<User>("auth/me", SERVER_ENDPOINT);
  getRequest.setHeader("Cookie", cookies().toString());

  const data = await getRequest.sendRequest();

  return data;
}

export { getCurrentUser as GET };
