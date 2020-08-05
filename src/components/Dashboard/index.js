/**
 * @author oguhpereira
 * Dashboard View
 */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Tooltip,
	ResponsiveContainer,
	Pie,
	Sector,
	PieChart,
} from 'recharts';

import lang from '../../languages';
import { formatMoney, roundNumber, formatDateFulllHour } from '../../utils';
import Card from '../Card';

function CustomizedAxisTick({ x, y, payload }) {
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={-3} y={-10} dy={16} textAnchor="end" fill="#666">
				{`R$${formatMoney(payload.value)}`}
			</text>
		</g>
	);
}

function CustomTooltip({ active, payload, label }) {
	if (active) {
		return (
			<div className="custom-tooltip">
				<p>
					<strong>{`${lang.price}: `}</strong>
					{`${`R$ ${formatMoney(
						payload[0].payload.quantity * payload[0].payload.price
					)}`}`}
				</p>
				<p>
					<strong>{`${lang.quantity}: `}</strong>
					{label}
				</p>
			</div>
		);
	}

	return null;
}

function CustomLineChart({ data }) {
	if (data.length > 0) {
		return (
			<ResponsiveContainer width="90%" height={300}>
				<LineChart
					data={data}
					margin={{
						top: 0,
						right: 0,
						left: 50,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="quantity" />
					<YAxis tick={<CustomizedAxisTick />} />
					<Tooltip content={<CustomTooltip />} />
					<Line type="monotone" dataKey="price" stroke="var(--green)" />
				</LineChart>
			</ResponsiveContainer>
		);
	}
	return <span>{lang.you_not_have_information}</span>;
}

const renderActiveShape = (props) => {
	const {
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		payload,
		percent,
		value,
	} = props;

	return (
		<g>
			<text
				x={cx}
				y={cy - 20}
				dy={5}
				fontWeight="bold"
				textAnchor="middle"
				fill="var(--blue-light)"
			>
				{payload.name}
			</text>
			<text
				x={cx}
				y={cy + 5}
				fontWeight="bold"
				dy={5}
				textAnchor="middle"
				fill="var(--green)"
			>{`R$ ${formatMoney(value)}`}</text>
			<text
				x={cx}
				y={cy + 30}
				dy={5}
				textAnchor="middle"
				fill="var(--blue-light)"
			>{`${(percent * 100).toFixed(2)}%`}</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill="var(--green)"
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill="var(--green)"
			/>
		</g>
	);
};

function PieChartCustom({ data }) {
	const [activeIndex, setIndex] = useState(0);
	if (data.length > 0) {
		function onPieEnter(data, index) {
			setIndex(index);
		}

		return (
			<ResponsiveContainer width="100%" height={250}>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={data}
						innerRadius={80}
						outerRadius={90}
						fill="var(--blue-light)"
						dataKey="value"
						onMouseEnter={onPieEnter}
					/>
				</PieChart>
			</ResponsiveContainer>
		);
	}
	return <span>{lang.you_not_have_information}</span>;
}

export default function Dashboard(props) {
	const wallet = useSelector((state) => state.wallet);
	const price = useSelector((state) => state.price);

	function dataLineChart(name) {
		let count = 0;
		const data = [].concat(wallet.operations).reverse();
		return data
			.reduce((acc, cur) => {
				if (
					cur.type === 'BUY' &&
					cur.name.toLowerCase() === name &&
					count < 11
				) {
					count++;
					return acc.concat({
						quantity: cur.quantity,
						price: cur.price * cur.quantity,
					});
				}
				return acc;
			}, [])
			.reverse();
	}
	function dataPieChart(type) {
		if (type === 'coins') {
			return wallet.coins.reduce((prev, cur) => {
				if (cur.quantity) {
					return prev.concat({
						name: cur.name,
						value: roundNumber(cur.quantity * price[cur.name.toLowerCase()]),
					});
				}
				return prev;
			}, []);
		} else {
			return [
				{
					name: lang.total_invested,
					value: wallet.totalInvested,
				},
				{
					name: lang.money_avaible,
					value: wallet.money,
				},
			];
		}
	}
	const descriptionPie = `${lang.last_updated} ${formatDateFulllHour(
		new Date()
	)}`;

	return (
		<div className="min-w-550">
			<h1 className="title">{lang.dashboard}</h1>
			<div className="wrap-card">
				<Card title={lang.your_wallet} description={descriptionPie}>
					<PieChartCustom data={dataPieChart('money')} />
				</Card>
				<Card title={lang.your_coins} description={descriptionPie}>
					<PieChartCustom data={dataPieChart('coins')} />
				</Card>
			</div>
			<h1 className="title">{lang.latest_operations}</h1>
			<div className="wrap-card">
				<Card title="Bitcoin" description={lang.extract}>
					<CustomLineChart data={dataLineChart('bitcoin')} />
				</Card>
				<Card title="Brita" description={lang.extract}>
					<CustomLineChart data={dataLineChart('brita')} />
				</Card>
			</div>
		</div>
	);
}
