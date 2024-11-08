import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default async function handler(req, res) {
	const { uid } = req.body;
	const maxAge = 60 * 60 * 24; // One day
	res.setHeader(
		'set-Cookie',
		`${SESSION_COOKIE_NAME}=${uid}; HttpOnly; Path=/; Max-Age=${maxAge}`
	);
	res.status(200).json({ success: true });
}
