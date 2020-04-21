import React from 'react';

import './rightbar.css';
import languages from '../../languages';
import BitcoinIcon from '../../assets/bitcoingreenbg.svg';
import BritaIcon from '../../assets/britagreenbg.svg';

const DinamicArea = ({ title, children }) => {
	const [viewShow, setShow] = React.useState(false);
	const handleShow = () => setShow(!viewShow);
	return (
		<div>
			<div className="header">
				<h3 className="title">{languages.your_wallet}</h3>
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

const MyCoins = () => {
	return (
		<div className="my-coins">
			<DinamicArea title={languages.your_wallet}>
				<div className="coins">
					<img
						className="coin-icon"
						src={BitcoinIcon}
						alt="Bitcoins"
						title="Biticoins"
					/>
					<div>
						<span className="value">$ 500.999.00</span>
						<span className="name">Bitcoins</span>
					</div>
				</div>
				<div className="coins">
					<img
						className="coin-icon"
						src={BritaIcon}
						alt="Brita"
						title="Brita"
					/>
					<div>
						<span className="values">$ 30.999.00</span>
						<span className="name">Brita</span>
					</div>
				</div>
			</DinamicArea>
		</div>
	);
};

const LatestOperation = () => {
	return (
		<div className="latest-operations">
			<DinamicArea title={languages.latest_operations}>
				<div className="operations">
					<ul className="operations-list">
						<li className="operation-item">
							<div className="operation-detail">
								<span className="coin">Bitcoin</span>
								<span className="value">R$ 400.000,00</span>
							</div>
							<span className="date">03/04/2020</span>
						</li>
						<li className="operation-item">
							<div className="operation-detail">
								<span className="coin">Bitcoin</span>
								<span className="value">R$ 400.000,00</span>
							</div>
							<span className="date">03/04/2020</span>
						</li>
						<li className="operation-item">
							<div className="operation-detail">
								<span className="coin">Bitcoin</span>
								<span className="value">R$ 400.000,00</span>
							</div>
							<span className="date">03/04/2020</span>
						</li>
						<li className="operation-item">
							<div className="operation-detail">
								<span className="coin">Bitcoin</span>
								<span className="value">R$ 400.000,00</span>
							</div>
							<span className="date">03/04/2020</span>
						</li>
					</ul>
					<div className="text-center mt-20">
						<a className="link" href="/">
							Ver strato completo
						</a>
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
				<span className="money-balance">{value}</span>
			</div>
		);
	}
	return;
};

const Balance = (props) => {
	return (
		<div className="balance">
			<DinamicArea title={languages.your_wallet}>
				<BalanceItem label={languages.money_avaible} value="R$ 13.000.000,00" />
				<br />
				<BalanceItem
					label={languages.total_invested}
					value="R$ 13.000.000,00"
				/>
			</DinamicArea>
		</div>
	);
};

export default function RightBar() {
	return (
		<div className="rightbar">
			<Balance />
			<MyCoins />
			<LatestOperation />
		</div>
	);
}
