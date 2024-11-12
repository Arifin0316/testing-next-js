import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import withAuth from './midlewares/withAuth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function Middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();
  return res;
}

export default withAuth(Middleware, ["/profile", "/admin"]);
