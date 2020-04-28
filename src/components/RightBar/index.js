/**
 * @author oguhpereira
 * Righht Bar Component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import './rightbar.css';
import { formatMoney, formatDate } from '../../utils';
import languages from '../../languages';
import BitcoinIcon from '../../images/bitcoingreenbg.svg';
import BritaIcon from '../../images/britagreenbg.svg';

/**
 * @function findIcon
 * @param {String} name
 * @returns {JSX}
 */
const findIcon = (name) => {
	switch (name.toLowerCase()) {
		case 'bitcoin':
			return BitcoinIcon;
		default:
			return BritaIcon;
	}
};

/**
 * @function DinamicArea
 * @returns {JSX}
 */
const DinamicArea = ({ title, children }) => {
	const [viewShow, setShow] = React.useState(true);
	const handleShow = () => setShow(!viewShow);
	return (
		<div>
			<div className="header">
				<h3 className="title">{title}</h3>
				<span
					onClick={handleShow}
					className={viewShow ? 'view-more active' : 'view-more'}
				>
					{languages.view_more}
				</span>
			</div>
			<div className={viewShow ? 'area' : 'hidden'}>{children}</div>
		</div>
	);
};

/**
 * @function Coin
 * @param {Number} value
 * @param {String} label
 * @param {String} src
 * @returns {JSX}
 */
const Coin = ({ value, label, src }) =>
	label && src ? (
		<div className="coin">
			<img className="coin-icon" src={src} alt={label} title={label} />
			<div>
				<span className="value">R$ {formatMoney(value)}</span>
				<span className="name">{label}</span>
			</div>
		</div>
	) : null;

/**
 * @function Coins
 * @returns {JSX}
 */
const Coins = () => {
	const wallet = useSelector((state) => state.wallet);
	const price = useSelector((state) => state.price);
	return (
		<div className="my-coins">
			<DinamicArea title={languages.your_coins}>
				{wallet.coins.map(({ quantity, name }, index) => {
					if (price[name.toLowerCase()] && quantity) {
						return (
							<Coin
								key={index}
								value={price[name.toLowerCase()] * quantity}
								label={name}
								src={findIcon(name)}
							/>
						);
					}
					return null;
				})}
			</DinamicArea>
		</div>
	);
};

/**
 * @function OperationItem
 * @param {String} coin
 * @param {Number} value
 * @param {Date} date
 * @returns {JSX}
 */
const OperationItem = ({ coin, value, date }) =>
	coin && value && date ? (
		<li className="operation-item">
			<div className="operation-detail">
				<span className="coin">{coin}</span>
				<span className="value">R$ {formatMoney(value)}</span>
			</div>
			<span className="date">{formatDate(date)}</span>
		</li>
	) : null;

/**
 * @function LatestOperation
 * @returns {JSX}
 */
const LatestOperation = () => {
	const { operations } = useSelector((state) => state.wallet);
	const Op = [].concat(operations).reverse();
	return (
		<div className="latest-operations">
			<DinamicArea title={languages.latest_operations}>
				<div className="operations">
					<ul className="operations-list">
						{Op.slice(0, 5).map(
							({ value, quantity, price, name, date }, index) => (
								<OperationItem
									key={index}
									coin={name}
									value={quantity * price}
									date={date}
								/>
							)
						)}
					</ul>
					<div className="text-center mt-20">
						<Link to="/login">{languages.see_complete_extract}</Link>
					</div>
				</div>
			</DinamicArea>
		</div>
	);
};

/**
 * @function BalanceItem
 * @param {String} label
 * @param {Number} value
 * @returns {JSX}
 */
const BalanceItem = ({ label, value }) => {
	if (label) {
		return (
			<div>
				<span className="description-balance">{label}</span>
				<span className="money-balance">R$ {formatMoney(value)}</span>
			</div>
		);
	}
	return <div />;
};

/**
 * @function BalanceItem
 * @param {Object} props
 * @returns {JSX}
 */
const Balance = (props) => {
	const wallet = useSelector((state) => state.wallet);
	return (
		<div className="balance">
			<DinamicArea title={languages.your_wallet}>
				<BalanceItem
					label={languages.money_avaible}
					value={wallet.money || 0}
				/>
				<br />
				<BalanceItem
					label={languages.total_invested}
					value={wallet.totalInvested}
				/>
			</DinamicArea>
		</div>
	);
};

/**
 * @function RightBar
 * @returns {JSX}
 */
function RightBar() {
	return (
		<div className="rightbar">
			<Balance />
			<Coins />
			<LatestOperation />
		</div>
	);
}

const mapStateToProps = (state) => ({
	wallet: state.wallet,
	price: state.price,
});

export default connect(mapStateToProps, null)(RightBar);
