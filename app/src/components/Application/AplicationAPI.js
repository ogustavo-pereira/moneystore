/**
 * @author oguhpereira
 * Aplication API methods
 */
import {
	API_MERCADO_BITCOIN,
	API_BANCO_CENTRAL,
	REQUEST_FAILID,
} from '../../constants';

/**
 * @function errorResponse
 * @param {Object} response
 * @returns {String} error
 */
function errorReponse(response) {
	const error = new Error(response.statusText);
	error.response = response;
	return error;
}

/**
 * @function getBitCoinPrice
 * @returns {Number} BitoinPrice
 */
export async function getBitCoinPrice() {
	try {
		const response = await fetch(`${API_MERCADO_BITCOIN}/BTC/ticker/`);
		if (response.status === 200) {
			const { ticker } = await response.json();
			sessionStorage.setItem('bitcoin', ticker.last);
			return ticker.last;
		} else {
			throw errorReponse(response);
		}
	} catch (err) {
		console.log(REQUEST_FAILID, err);
	}
}

/**
 * @function getBritaPrice
 * @returns {Number} Get Dolar Price
 */
export async function getBritaPrice(date) {
	try {
		const response = await fetch(
			`${API_BANCO_CENTRAL}/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${
				date.getMonth() + 1
			}-${date.getDate()}-${date.getFullYear()}%27&&$format=json`
		);
		if (response.status === 200) {
			const { value } = await response.json();
			if (value[0]) {
				sessionStorage.setItem('brita', value[0].cotacaoCompra);
				return value[0].cotacaoCompra;
			}

			return getBritaPrice(new Date(date.setDate(date.getDate() - 1)));
		} else {
			throw errorReponse(response);
		}
	} catch (err) {
		console.log(REQUEST_FAILID, err);
	}
}

/**
 * @function getWallet
 * @returns {Object} Wallet Settings
 */
export function getWallet() {
	const userAuth = localStorage.getItem('auth');
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	const wallet = JSON.parse(atob(dataUser[userAuth]));
	return wallet;
}
