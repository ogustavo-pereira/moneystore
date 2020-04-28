/**
 * @author oguhpereira
 * Trade API functions
 */
import {
	INVALID_PARAM,
	PARAM_VERYSHORT,
	INVALID_QUOTE,
	INSUFFICIENT_MONEY,
	REQUEST_SUCCESSFUL,
	INVALID_TOKEN,
	INSUFFICIENT_QUANTITY,
} from '../../constants';
import { roundNumber } from '../../utils';

/**
 * @function validCoinData
 * @param {Object} coinData
 * @returns {Object}
 */
function validCoinData(coinData) {
	if (!coinData.name) {
		return {
			message: INVALID_PARAM,
			parm: 'name',
			status: 500,
		};
	}

	if (!coinData.price) {
		return {
			message: INVALID_PARAM,
			parm: 'price',
			status: 500,
		};
	}

	if (!coinData.quantity) {
		return {
			message: INVALID_PARAM,
			parm: 'quantity',
			status: 500,
		};
	}
	if (coinData.price * coinData.quantity <= 1) {
		return {
			message: PARAM_VERYSHORT,
			parm: 'quantity',
			status: 500,
		};
	}
	if (
		parseFloat(sessionStorage.getItem(coinData.name.toLowerCase())) !==
		coinData.price
	) {
		return {
			message: INVALID_QUOTE,
			parm: 'price',
			status: 500,
		};
	}
	return false;
}

/**
 * @function saveData
 * @param {Object} dataUser
 * @param {String} auth
 * @param {Object} wallet
 * @returns {Object}
 */
function saveData(dataUser, auth, wallet) {
	dataUser[auth] = btoa(JSON.stringify(wallet));
	localStorage.setItem('data', JSON.stringify(dataUser));
	return {
		message: REQUEST_SUCCESSFUL,
		wallet,
		status: 200,
	};
}

/**
 * @function buy
 * @param {Object} coinData
 * @param {String} auth
 * @returns {Object}
 */
export function buy(coinData, auth) {
	const validateParams = validCoinData(coinData);
	if (validateParams) {
		return validateParams;
	}
	const price = coinData.price * coinData.quantity;
	const quantity = roundNumber(coinData.quantity);
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	if (dataUser[auth]) {
		const wallet = JSON.parse(atob(dataUser[auth]));

		const WalletIndex = wallet.coins.findIndex(
			(e) => e.name.toLowerCase() === coinData.name.toLowerCase()
		);
		if (WalletIndex !== -1) {
			if (wallet.money - price > 0) {
				wallet.money -= price;
				if (wallet.totalInvested) {
					wallet.totalInvested = roundNumber(wallet.totalInvested + price);
				} else {
					wallet.totalInvested = price;
				}
				if (wallet.coins[WalletIndex].quantity) {
					wallet.coins[WalletIndex].quantity = roundNumber(
						wallet.coins[WalletIndex].quantity + quantity
					);
				} else {
					wallet.coins[WalletIndex].quantity = quantity;
				}

				wallet.operations.push({
					name: wallet.coins[WalletIndex].name,
					price: coinData.price,
					quantity: quantity,
					date: new Date().toISOString(),
					status: 'COMPLETED',
					type: 'BUY',
				});

				return saveData(dataUser, auth, wallet);
			}

			return {
				message: INSUFFICIENT_MONEY,
				status: 500,
			};
		}
	} else {
		return {
			message: INVALID_TOKEN,
			status: 500,
		};
	}
}

/**
 * @function sell
 * @param {Object} coinData
 * @param {String} auth
 * @returns {Object}
 */
export function sell(coinData, auth) {
	const validateParams = validCoinData(coinData);
	if (validateParams) {
		return validateParams;
	}
	const price = coinData.price * coinData.quantity;
	const quantity = roundNumber(coinData.quantity);
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	if (dataUser[auth]) {
		const wallet = JSON.parse(atob(dataUser[auth]));
		const WalletIndex = wallet.coins.findIndex(
			(e) => e.name.toLowerCase() === coinData.name.toLowerCase()
		);
		const walletQuantity = roundNumber(wallet.coins[WalletIndex].quantity) || 0;
		if (WalletIndex !== -1) {
			if (walletQuantity >= quantity) {
				wallet.money += price;
				if (wallet.totalInvested) {
					wallet.totalInvested = roundNumber(wallet.totalInvested - price);
				}
				if (wallet.coins[WalletIndex].quantity) {
					wallet.coins[WalletIndex].quantity = roundNumber(
						walletQuantity - quantity
					);
				}

				wallet.operations.push({
					name: wallet.coins[WalletIndex].name,
					price: coinData.price,
					quantity: quantity,
					date: new Date().toISOString(),
					status: 'COMPLETED',
					type: 'SELLL',
				});

				return saveData(dataUser, auth, wallet);
			}

			return {
				message: INSUFFICIENT_QUANTITY,
				status: 500,
			};
		}
	} else {
		return {
			message: INVALID_TOKEN,
			status: 500,
		};
	}
}
