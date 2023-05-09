/**
 * @author oguhpereira
 * Left Bar Component
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './leftbar.css';
import Logo from '../../images/logo.svg';
import Help from '../../images/help.svg';
import Logout from '../../images/logouticon.svg';
import Stats from '../../images/stats.svg';
import StatsActive from '../../images/stats-active.svg';
import Shopping from '../../images/shopping.svg';
import ShoppingActive from '../../images/shopping-active.svg';
import lang from '../../constants/languages';
import { logout } from '../../store/actions/auth';
import Modal from '../Modal';

function LeftBar({ logout }) {
	let history = useHistory();
	const [viewModalHelp, setViewModalHelp] = useState(false);
	const dashboadIcon = window.location.pathname.match('dashboard');
	const shoppingIcon = window.location.pathname.match('trade');
	function handleLogout() {
		localStorage.setItem('auth', '');
		logout();
		history.push('/login');
	}
	return (
		<div className="leftbar">
			<div className="logo">
				<img className="icon-md" src={Logo} alt={lang.logo} title={lang.logo} />
			</div>
			<ul className="navigation">
				<li
					className={
						dashboadIcon ? 'navigation-item active' : 'navigation-item'
					}
				>
					<Link to="/dashboard">
						<img
							className="icon-md"
							src={dashboadIcon ? StatsActive : Stats}
							alt={lang.myaccount}
							title={lang.myaccount}
						/>
					</Link>
				</li>
				<li
					className={
						shoppingIcon ? 'navigation-item active' : 'navigation-item'
					}
				>
					<Link to="/trade">
						<img
							className="icon-md"
							src={shoppingIcon ? ShoppingActive : Shopping}
							alt={lang.tradearea}
							title={lang.tradearea}
						/>
					</Link>
				</li>
			</ul>
			<div>
				<div className="logout" onClick={() => handleLogout()}>
					<img
						className="icon-md"
						src={Logout}
						alt={lang.logout}
						title={lang.logout}
					/>
				</div>
				<div className="help" onClick={() => setViewModalHelp(true)}>
					<img
						className="icon-md"
						src={Help}
						alt={lang.help}
						title={lang.help}
					/>
				</div>
				<Modal
					header={{
						title: lang.help,
						description: 'MoneyStore',
					}}
					visible={viewModalHelp}
					callback={() => {
						setViewModalHelp(false);
					}}
					hasCloseArea
				>
							<div>
			The MoneyStore is a simple web app for managing cryptocurrency virtual wallets. The code repository you can check on the [github](https://github.com/oguhpereira/moneystore).

## For Run the Project

All instructions about run this project can be found at [README](https://github.com/oguhpereira/moneystore/blob/master/README.md)

## Contribuitors

*  [Gustavo Pereira](https://oguhpereira.com.br/)
		</div>
				</Modal>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout()),
	};
};

export default connect(null, mapDispatchToProps)(LeftBar);
