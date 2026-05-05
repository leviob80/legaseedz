import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COMING_SOON = '/coming-soon'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let these through untouched
  if (
    pathname.startsWith(COMING_SOON) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(COMING_SOON, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
