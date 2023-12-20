import { NextRequest, NextResponse } from "next/server";
import initAuth from "./initAuth";

export async function middleware(request: NextRequest) {
  return await initAuth(request, NextResponse);
}
