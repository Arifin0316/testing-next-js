import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import withAuth from './midlewares/withAuth';

export function Middleware(req: NextRequest) {
 const res = NextResponse.next();
 return res
}

export default withAuth(Middleware, ["/profile", "/admin"])
