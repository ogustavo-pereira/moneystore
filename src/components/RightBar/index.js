import React from 'react';
import { Link } from 'react-router-dom';

import './rightbar.css';
import { formatMoney } from '../../utils';
import languages from '../../languages';
import BitcoinIcon from '../../images/bitcoingreenbg.svg';
import BritaIcon from '../../images/britagreenbg.svg';

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

const Coin = ({ value, label, src }) =>
	value && label && src ? (
		<div className="coin">
			<img className="coin-icon" src={src} alt={label} title={label} />
			<div>
				<span className="value">{formatMoney(value)}</span>
				<span className="name">{label}</span>
			</div>
		</div>
	) : null;

const Coins = () => {
	return (
		<div className="my-coins">
			<DinamicArea title={languages.your_coins}>
				<Coin value="20000000" label="Biticoins" src={BitcoinIcon} />
				<Coin value="3000000" label="Brita" src={BritaIcon} />
			</DinamicArea>
		</div>
	);
};

const OperationItem = ({ coin, value, date }) =>
	coin && value && date ? (
		<li className="operation-item">
			<div className="operation-detail">
				<span className="coin">{coin}</span>
				<span className="value">{formatMoney(value)}</span>
			</div>
			<span className="date">{date}</span>
		</li>
	) : null;

const LatestOperation = () => {
	return (
		<div className="latest-operations">
			<DinamicArea title={languages.latest_operations}>
				<div className="operations">
					<ul className="operations-list">
						<OperationItem coin="Bitcoin" value="40000000" date="03/04/2020" />
					</ul>
					<div className="text-center mt-20">
						<Link to="/login">{languages.see_complete_extract}</Link>
					</div>
				</div>
			</DinamicArea>
		</div>
	);
};

const BalanceItem = ({ label, value }) => {
	if (value && label) {
		return (
			<div>
				<span className="description-balance">{label}</span>
				<span className="money-balance">{formatMoney(value)}</span>
			</div>
		);
	}
	return;
};

const Balance = (props) => {
	return (
		<div className="balance">
			<DinamicArea title={languages.your_wallet}>
				<BalanceItem label={languages.money_avaible} value="1300000.323204" />
				<br />
				<BalanceItem label={languages.total_invested} value="1300000000" />
			</DinamicArea>
		</div>
	);
};

export default function RightBar(props) {
	return (
		<div className="rightbar">
			<Balance />
			<Coins />
			<LatestOperation />
		</div>
	);
}
