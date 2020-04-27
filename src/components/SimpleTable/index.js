/**
 * @author oguhpereira
 * Simple table component
 */
import React from 'react';
import './simple-table.css';

/**
 * @function TableRow
 * @param {Array} data
 * @param {Array} keys
 * @returns {JSX}
 */
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

/**
 * @function SimpleTable
 * @param {String} title
 * @param {Array} head
 * @param {Array} content
 * @param {Array} keys
 * @returns {JSX}
 */
export function SimpleTable({ title, head, content = [], keys }) {
	if (content.length > 0) {
		return (
			<div className="table-content">
				{title && <h2 className="subtitle">{title}</h2>}
				<table className="simple-table">
					<thead className="thead">
						<tr>
							{head.map((nameTH, index) => (
								<th className="th" key={index}>
									{nameTH}
								</th>
							))}
						</tr>
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
	return <div />;
}
