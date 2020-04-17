/**
 * @function errorSpan
 * @param label string to innerHTML
 * Create Node element
 */
export function errorSpan(label) {
	const errorRaw = document.createElement('span');
	errorRaw.className = 'error-small';
	errorRaw.innerHTML = label;
	return errorRaw;
}
