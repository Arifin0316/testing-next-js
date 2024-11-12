
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const onlyAdmin = ["/admin"];

export default function withAuth(middleware: (req: NextRequest) => Promise<NextResponse>, requireAuth: string[] = []) {
  return async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const redirectUrl = new URL("/auth/login", req.url);
        redirectUrl.searchParams.set("callbackUlr", encodeURI(req.url))
        return NextResponse.redirect(redirectUrl);
      }
      if(token.role !== "admin" && onlyAdmin.includes(pathname)){
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return await middleware(req);
  };
}
