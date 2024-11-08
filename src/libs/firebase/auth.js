import {
	GoogleAuthProvider,
	onAuthStateChanged as _onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth, firebaseRTDatabase } from './config';
import { get, ref } from 'firebase/database';

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
	// return _onAuthStateChanged(firebaseAuth, callback);
	_onAuthStateChanged(firebaseAuth, async (user) => {
		const updatedUser = user ? await adminUser(user) : null;
		console.log(updatedUser, 'this is updated user');
		callback(updatedUser);
	});
}
export async function adminUser(user) {
	const dbRef = ref(firebaseRTDatabase, 'admins');
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const admins = snapshot.val();
			const isAdmin = user.uid in admins;
			console.log(admins, 'this is admins');
			// const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin: true };
		}
		console.log('No admins found in snapshot......');
		return { ...user };
	} catch (error) {
		console.log('Error fetching admin data:', error);
		return { ...user };
	}
}
