import { NextResponse } from 'next/server';
import { isTokenExpired } from '../lib/token';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const token = (await cookies()).get('token')?.value; 
  if (isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/login', request.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)', 
};