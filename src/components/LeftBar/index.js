import React from 'react';
import { Link } from 'react-router-dom';

import './leftbar.css';
import Logo from '../../logo.svg';
import Help from '../../assets/help.svg';
import Stats from '../../assets/shopping.svg';
import StatsActive from '../../assets/stats-active.svg';
import Shopping from '../../assets/shopping.svg';
import ShoppingActive from '../../assets/shopping-active.svg';
import languages from '../../languages';

export default function LeftBar(props) {
	const dashboadIcon = window.location.pathname.match('dashboard');
	const shoppingIcon = window.location.pathname.match('trade');

	return (
		<div className="leftbar">
			<div className="logo">
				<img
					className="icon-md"
					src={Logo}
					alt={languages.logo}
					title={languages.logo}
				/>
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
							alt={languages.myaccount}
							title={languages.myaccount}
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
							alt={languages.tradearea}
							title={languages.tradearea}
						/>
					</Link>
				</li>
			</ul>
			<div className="help">
				<img
					className="icon-md"
					src={Help}
					alt={languages.help}
					title={languages.help}
				/>
			</div>
		</div>
	);
}
