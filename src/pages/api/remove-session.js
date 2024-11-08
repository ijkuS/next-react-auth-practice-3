import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	res.setHeader(
		'Set-Cookie',
		`${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0;`
	);
	res.status(200).json({ success: true });
}
