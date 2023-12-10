import { NextRequest, NextResponse } from "next/server";
import { initAuth } from "./auth";

export async function middleware(request: NextRequest) {
  return await initAuth(request, NextResponse);
}
