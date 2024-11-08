'use client';

import { createSession, removeSession } from '@/actions/auth-actions';
import useUserSession from '@/hooks/useUserSession';
import {
	adminUser,
	loginWithGoogle,
	logoutWithGoogle,
} from '@/libs/firebase/auth';
import Link from 'next/link';

export default function Header({ session }) {
	const userSessionId = useUserSession(session);
	const handleLogin = async () => {
		const userId = await loginWithGoogle();
		if (userId) {
			// check if the user is admin
			await createSession(userId);
		}
	};
	const handleLogout = async () => {
		await logoutWithGoogle();
		await removeSession();
	};

	return (
		<header>
			<menu>
				<Link href='/products/all'>Products</Link>
				{userSessionId && <Link href='/cart'>Cart</Link>}
			</menu>
			{userSessionId ? (
				<button onClick={handleLogout}>Logout</button>
			) : (
				<button onClick={handleLogin}>Login</button>
			)}
		</header>
	);
}
