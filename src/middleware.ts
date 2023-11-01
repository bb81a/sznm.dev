/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { env } from '~/lib/constants/env';
import { funPaths } from '~/lib/constants/paths';

export const middleware = async (req: NextRequest) => {
  const isFunPath = !!funPaths.find((item) => req.nextUrl.href.includes(item));

  if (isFunPath) {
    return NextResponse.redirect(env.MM_URL);
  }

  if (!req.nextUrl.pathname.startsWith('/s')) {
    return NextResponse.next();
  }

  const slug = req.nextUrl.pathname.split('/')[2];

  if (!slug) {
    return NextResponse.rewrite(`${req.nextUrl.origin}/404`);
  }

  return NextResponse.redirect(`${env.SHORTENER_HOST_NAME}/${slug}`);
};

export const config = {
  matcher: [
    ...funPaths.map((item) => `/${item}:path*`),
    '/s/:path*',
    '/((?!api|_next/static|favicon.ico|manifest.json|robots.txt).*)',
  ],
};
