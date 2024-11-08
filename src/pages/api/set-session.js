import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default async function handler(req, res) {
	const { uid } = req.body;
	res.setHeader(
		'set-Cookie',
		`${SESSION_COOKIE_NAME}=${uid}; HttpOnly; Path=/;`
	);
	res.status(200).json({ success: true });
}
