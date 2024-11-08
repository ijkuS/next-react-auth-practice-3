import React from 'react';
import '../app/globals.css';
import Header from '@/components/Header';

export default function MyApp({ Component, pageProps }) {
	return (
		<main className='main-wrapper'>
			<Header />
			<Component {...pageProps} />
		</main>
	);
}
