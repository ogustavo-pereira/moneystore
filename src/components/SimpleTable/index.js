/**
 * @author oguhpereira
 * Simple table component
 */
import React from 'react';
import './simple-table.css';

function TableRow({ data, keys }) {
	return (
		<tr>
			{keys.map((td, indextd) => (
				<td className="td" key={indextd}>
					{data[td]}
				</td>
			))}
		</tr>
	);
}

export function SimpleTable({ title, head, content, keys }) {
	return (
		<div className="table-content">
			{title && <h2 className="subtitle">{title}</h2>}
			<table className="simple-table">
				<thead className="thead">
					{head.map((nameTH, index) => (
						<th className="th" key={index}>
							{nameTH}
						</th>
					))}
				</thead>
				<tbody className="tbody">
					{content.map((tr, index) => {
						return <TableRow key={index} data={tr} keys={keys} />;
					})}
				</tbody>
			</table>
		</div>
	);
}
