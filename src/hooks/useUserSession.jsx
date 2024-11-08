import { onAuthStateChanged } from '@/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

// session management in Client
export default function useUserSession(initSession) {
	const [user, setUser] = useState(initSession);

	// Listen for changes to the user session
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(async (authUser) => {
			if (authUser) {
				setUser(authUser.uid);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);
	return user;
}
