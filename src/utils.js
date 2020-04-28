/**
 * @function errorSpan
 * @param {String} label
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
 * @param {Number} num
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
 * @param {Date} date
 * @returns String
 * format date with dd/mm/yyyy
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

/**
 * @function disableOperators
 * @param {Event} number
 * prevent click operators key
 */
export function disableOperators(evt) {
	if (
		(evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
		(evt.which > 57 && evt.which !== 190)
	) {
		evt.preventDefault();
	}
}

/**
 * @function roundNumber
 * @param {Number} number
 * @returns {Number}
 */
export function roundNumber(number) {
	return Math.round(number * 10000) / 10000;
}

/**
 * @function roundString
 * @param {String} number
 * @returns {Number}
 */
export function roundString(number) {
	return number.replace(/(^\d*.{5})(\d*)/g, '$1').replace(/(^0+)(\d)/g, '0.$2');
}

/**
 * @function formatDateFulllHour
 * @param {Date} date
 * @returns {String}
 * format date with dd/mm/yyyy
 */
export function formatDateFulllHour(date) {
	if (date) {
		const dateFormated = new Date(date);
		return `${`0${dateFormated.getDay()}`.slice(-2)}/${`0${
			dateFormated.getMonth() + 1
		}`.slice(
			-2
		)}/${dateFormated.getFullYear()} ${`0${dateFormated.getHours()}`.slice(
			-2
		)}:${`0${dateFormated.getMinutes()}`.slice(
			-2
		)}:${`0${dateFormated.getSeconds()}`.slice(-2)}`;
	}
	return null;
}
