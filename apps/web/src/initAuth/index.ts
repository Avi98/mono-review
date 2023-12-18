import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_PATHS } from "./const";
import { cookies } from "next/headers";
import { UnAuthorizedError } from "../utils/exceptions";
import { GetRequestBuilder } from "../../api/common/get-request-builder";
import { SERVER_ENDPOINT } from "../../api/contants";

const REDIRECT_URL = "redirect-url";

export const hasAuth = async () => {
  const getRequest = new GetRequestBuilder("auth/me", SERVER_ENDPOINT);
  console.log({ cookies: cookies().toString() });
  getRequest.setHeader("Cookie", cookies().toString());

  return getRequest.sendRequest();
};

const initAuth = async (req: NextRequest, res: typeof NextResponse) => {
  try {
    if (PROTECTED_PATHS.includes(req.nextUrl.pathname)) {
      await hasAuth().then(
        (response) => {
          console.log({ response });
          return res.next();
        },
        (error) => {
          console.log({ error });
          throw error;
        }
      );
      return onAuthSuccess(req, res);
    }

    return res.next();
  } catch (error) {
    if (error instanceof UnAuthorizedError) {
      const loginURL = redirectToLogIn(req);
      const response = res.redirect(loginURL, { status: 301 });

      const returnResponse = new Response(response.body, response);
      return returnResponse;
    }
  }
};

const shouldRedirect = (currentPath: URL) => {
  const hasRedirectPath = currentPath.searchParams.get(REDIRECT_URL);
  if (hasRedirectPath) return false;

  const isProtectedRoute = PROTECTED_PATHS.includes(currentPath.pathname);
  if (isProtectedRoute) return true;
};

const getAuthRedirect = (url: URL) => {
  const redirectPath = url.searchParams.get(REDIRECT_URL);
  const redirectURL = redirectPath?.startsWith("/")
    ? `${url.origin}${redirectPath}`
    : redirectPath;

  const redirectHasSameOrigin = new URL(redirectURL!).origin === url.origin;

  if (redirectHasSameOrigin) return redirectURL;
};

const onAuthSuccess = (req: NextRequest, res: typeof NextResponse) => {
  const hasRedirect = getAuthRedirect(req.nextUrl);
  if (hasRedirect) {
    return res.redirect(hasRedirect);
  }
  return res.next();
};

const redirectToLogIn = (req: NextRequest) => {
  const loginURL = "/login";
  const redirectLogin = req.nextUrl.clone();

  if (shouldRedirect(req.nextUrl)) {
    redirectLogin.pathname = loginURL;
    redirectLogin.searchParams.set(REDIRECT_URL, req.nextUrl.href);
    return redirectLogin;
  }
  return req.nextUrl.href;
};

export default initAuth;
