/**
 * @author oguhpereira
 * Extract View
 */
import React from 'react';
import { useSelector } from 'react-redux';

import SimpleTable from '../SimpleTable';
import lang from '../../languages';
import { formatMoney, roundNumber, formatDateFulllHour } from '../../utils';
import PrintIcon from '../../images/printicon.svg';
import './extract.css';

/**
 * @function Extract
 * @returns {JSX}
 */
export default function Extract() {
	const wallet = useSelector((state) => state.wallet);
	const data = [].concat(wallet.operations).reverse();

	function PrintExtract() {
		const content = document.getElementById('extract-table');
		const pri = document.getElementById('printer').contentWindow;
		pri.document.open();
		pri.document.write(`
		<style>
			.simple-table {
				text-align: center;
				width: 100%;

			}
		</style>

		${content.innerHTML}`);
		pri.document.close();
		pri.focus();
		pri.print();
	}
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

	return (
		<div className="extract">
			<div className="header">
				<h1 className="title">{lang.complete_extract}</h1>
				<span className="btn btn-print" onClick={() => PrintExtract()}>
					<img src={PrintIcon} title={lang.print} alt={lang.print} />
					{lang.print}
				</span>
			</div>

			<div id="extract-table">
				<SimpleTable
					title={lang.extract}
					head={extractTable.head}
					content={extractTable.data}
					keys={extractTable.keys}
				/>
			</div>
			<iframe title="printer" id="printer" />
		</div>
	);
}
