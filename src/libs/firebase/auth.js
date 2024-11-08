import {
	GoogleAuthProvider,
	onAuthStateChanged as _onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth, firebaseRTDatabase } from './config';
import { get, getDatabase, ref } from 'firebase/database';

export async function loginWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(firebaseAuth, provider);
		if (!result || !result.user) {
			throw new Error('Google sign in failed');
		}
		return result.user.uid;
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}

export async function logoutWithGoogle() {
	try {
		await firebaseAuth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
}
export function onAuthStateChanged(callback) {
	const unsubscribe = _onAuthStateChanged(firebaseAuth, async (user) => {
		const updatedUser = user ? await adminUser(user) : null;
		callback(updatedUser);
	});
	return unsubscribe;
	// _onAuthStateChanged(firebaseAuth, async (user) => {
	// 	const updatedUser = user ? await adminUser(user) : null;
	// 	callback(updatedUser);
	// });
}
async function adminUser(user) {
	const dbRef = ref(firebaseRTDatabase, 'admins');
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const admins = snapshot.val();
			const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin };
		}
		return user;
	} catch (error) {
		console.log(error);
	}
}
