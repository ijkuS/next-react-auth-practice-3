import Header from '@/components/Header';
import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';
import { cookies } from 'next/headers';
import '../app/globals.css';

export default async function RootLayout({ children }) {
	const storedCookies = await cookies();
	const session = storedCookies.get(SESSION_COOKIE_NAME)?.value;

	return (
		<html>
			<body>
				<main className='main-wrapper'>
					<Header session={session} />
					{children}
				</main>
			</body>
		</html>
	);
}
