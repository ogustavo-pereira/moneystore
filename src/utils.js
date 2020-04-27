/**
 * @function errorSpan
 * @param label string to innerHTML
 * @returns Element Span
 * Create Node element
 */
export function errorSpan(label) {
	const errorRaw = document.createElement('span');
	errorRaw.className = 'error-small';
	errorRaw.innerHTML = label;
	return errorRaw;
}

/**
 * @function formatMoney
 * @param num decimal
 * @returns String
 * Separate decimal with comma and dot
 */
export function formatMoney(num = 0) {
	let splitedValue = parseFloat(num).toFixed(2).toString().split('.');
	splitedValue[0] = splitedValue[0]
		.toString()
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	if (splitedValue.length > 1) {
		return splitedValue.join(',');
	}
	return `${splitedValue[0]},00`;
}

/**
 * @function formatDate
 * @param num decimal
 * @returns String
 * Separate decimal with comma and dot
 */
export function formatDate(date) {
	if (date) {
		const dateFormated = new Date(date);
		return `${`0${dateFormated.getDay()}`.slice(-2)}/${`0${
			dateFormated.getMonth() + 1
		}`.slice(-2)}/${dateFormated.getFullYear()}`;
	}
	return null;
}
