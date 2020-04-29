/**
 * @author oguhpereira
 * Left Bar Component
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Markdown from 'react-markdown';

import './leftbar.css';
import Logo from '../../images/logo.svg';
import Help from '../../images/help.svg';
import Logout from '../../images/logouticon.svg';
import Stats from '../../images/stats.svg';
import StatsActive from '../../images/stats-active.svg';
import Shopping from '../../images/shopping.svg';
import ShoppingActive from '../../images/shopping-active.svg';
import lang from '../../languages';
import { logout } from '../../store/actions/auth';
import Modal from '../Modal';
import HelpInfo from './Help.md';

function HelpModal() {
	const [sourceMarkdown, setSourceMarkdown] = useState(null);
	useEffect(() => {
		async function getRaw() {
			if (!sourceMarkdown) {
				const response = await fetch(HelpInfo);
				const text = await response.text();
				setSourceMarkdown(text);
			}
		}
		getRaw();
	});
	return (
		<div>
			<Markdown source={sourceMarkdown} />
		</div>
	);
}

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
					<HelpModal />
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
