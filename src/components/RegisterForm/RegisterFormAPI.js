import lang from '../../languages';
/**
 * @function save
 * @param {Object} data json form
 * @returns {Boolean}
 * Save element in localstorage
 */
export function save(data) {
	const user = btoa(JSON.stringify(data));
	const email = btoa(data.email);
	const emails = JSON.parse(localStorage.getItem('emails') || '[]');
	const users = JSON.parse(localStorage.getItem('users') || '[]');

	if (emails.findIndex((e) => e === email) !== -1) {
		throw lang.email_already_registered;
	}

	emails.push(email);
	users.push(user);
	localStorage.setItem('emails', JSON.stringify(emails));
	localStorage.setItem('users', JSON.stringify(users));
	return true;
}
