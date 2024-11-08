import { onAuthStateChanged } from '@/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

// session management in Client
export default function useUserSession(initSession) {
	const [user, setUser] = useState(initSession);

	// Listen for changes to the user session
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(async (authUser) => {
			setUser(authUser ? authUser.uid : null);
			console.log(authUser, 'this is from authUser');
		});
		return () => unsubscribe();
	}, []);
	return user;
}
