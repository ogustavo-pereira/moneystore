/**
 * @author oguhpereira
 * Extract View
 */
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useSelector } from 'react-redux';

import SimpleTable from '../SimpleTable';
import lang from '../../constants/languages';
import {
	formatMoney,
	roundNumber,
	formatDateFulllHour,
} from '../../helpers/utils';
import PrintIcon from '../../images/printicon.svg';
import './extract.css';

/**
 * @function Extract
 * @returns {JSX}
 */
export default function Extract() {
	const tableExtract = useRef(null);
	const wallet = useSelector((state) => state.wallet);
	const data = [].concat(wallet.operations).reverse();

	function dataExtract() {
		return data.map((extractRow) => {
			return {
				name: <span className="">{extractRow.name}</span>,
				price: (
					<span className={`price-${extractRow.type.toLowerCase()}`}>
						{`${
							extractRow.type.toLowerCase() === 'buy'
								? '-'
								: extractRow.type.toLowerCase() === 'sell'
								? '+'
								: ''
						}  R$ ${formatMoney(extractRow.price)}`}
					</span>
				),
				quantity: roundNumber(extractRow.quantity),
				status: (
					<span className={`status-${extractRow.status.toLowerCase()}`}>
						{extractRow.status}
					</span>
				),
				date: formatDateFulllHour(extractRow.date),
				type: (
					<span className={`type-${extractRow.type.toLowerCase()}`}>
						{extractRow.type}
					</span>
				),
			};
		});
	}

	const extractTable = {
		head: [
			lang.date,
			lang.price,
			lang.type,
			lang.coin,
			lang.quantity,
			lang.status,
		],
		keys: ['date', 'price', 'type', 'name', 'quantity', 'status'],
		data: dataExtract(),
	};
	console.log(tableExtract);
	return (
		<div className="extract">
			<div className="header">
				<h1 className="title">{lang.complete_extract}</h1>
				<ReactToPrint
					trigger={() => (
						<span className="btn btn-print">
							<img src={PrintIcon} title={lang.print} alt={lang.print} />
							{lang.print}
						</span>
					)}
					content={() => tableExtract.current}
					pageStyle={{ padding: 20 }}
				/>
			</div>

			<div ref={tableExtract} id="extract-table">
				<SimpleTable
					title={lang.extract}
					head={extractTable.head}
					content={extractTable.data}
					keys={extractTable.keys}
				/>
			</div>
		</div>
	);
}
