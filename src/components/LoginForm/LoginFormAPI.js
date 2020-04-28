import lang from '../../languages';
/**
 * @function login
 * @param {Object} data json form
 * @return {String} login auth
 */
export function login(userWantLogin) {
	const emailWantLogin = btoa(userWantLogin.email);
	const emails = JSON.parse(localStorage.getItem('emails') || '[]');
	const users = JSON.parse(localStorage.getItem('users') || '[]');
	const userFound = emails.findIndex((e) => e === emailWantLogin);

	if (userFound === -1) {
		throw lang.user_not_found;
	}

	const decriptyUser = JSON.parse(atob(users[userFound]));
	if (
		decriptyUser.email !== userWantLogin.email ||
		decriptyUser.password !== userWantLogin.password
	) {
		throw lang.password_error;
	}
	const userAuth = btoa(userFound + userWantLogin.email);
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	localStorage.setItem('auth', userAuth);

	if (!(userAuth in dataUser)) {
		dataUser[userAuth] = btoa(
			JSON.stringify({
				money: 100000,
				totalInvested: 0,
				operations: [],
				coins: [
					{ name: 'BitCoin', quantity: 0 },
					{ name: 'Brita', quantity: 0 },
				],
			})
		);
		localStorage.setItem('data', JSON.stringify(dataUser));
	}

	return btoa(userFound + userWantLogin.email);
}
