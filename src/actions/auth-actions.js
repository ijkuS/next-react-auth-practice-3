'use server';

export async function createSession(uid) {
	await fetch('/api/set-session', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uid }),
	});
}
export async function removeSession() {
	await fetch('/api/remove-session', {
		method: 'POST',
	});
}

// export async function createSession(uid) {
// 	const StoredCookies = await cookies();
// 	StoredCookies.set(SESSION_COOKIE_NAME, uid, {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === 'production',
// 		maxAge: 60 * 60 * 24, // One day
// 		path: '/',
// 	});
// 	redirect(HOME_ROUTE);
// }
// export async function removeSession() {
// 	const StoredCookies = await cookies();
// 	StoredCookies.delete(SESSION_COOKIE_NAME);

// 	redirect(ROOT_ROUTE);
// }
