import {
	ADMIN_ADDNEW_ROUTE,
	CART_ROUTE,
	ROOT_ROUTE,
	HOME_ROUTE,
	SESSION_COOKIE_NAME,
} from './routes/middleware-constants';
import { NextResponse } from 'next/server';

const adminOnlyRoutes = [ADMIN_ADDNEW_ROUTE];
const memberOnlyRoutes = [CART_ROUTE];

export default function middleware(request) {
	const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

	// redirect to '/' if session is not set
	if (
		!session &&
		(adminOnlyRoutes.includes(request.nextUrl.pathname) ||
			memberOnlyRoutes.includes(request.nextUrl.pathname))
	) {
		const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}
	// Redirect to home if session is set and user tries to access root
	if (session && request.nextUrl.pathname === ROOT_ROUTE) {
		const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}
}
