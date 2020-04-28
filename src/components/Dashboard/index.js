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
	Legend,
} from 'recharts';

import lang from '../../languages';
import { formatMoney, roundNumber, formatDateFulllHour } from '../../utils';
import Card from '../Card';

function CustomizedAxisTick({ x, y, payload }) {
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666">
				{`R$ ${formatMoney(payload.value)}`}
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
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={data}
				margin={{
					top: 0,
					right: 30,
					left: 20,
					bottom: 5,
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
			return wallet.coins.map((coin) => {
				return {
					name: coin.name,
					value: roundNumber(coin.quantity * price[coin.name.toLowerCase()]),
				};
			});
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
		<div>
			<h1 className="title">{lang.dashboard}</h1>
			<div className="row">
				<div className="col-6">
					<Card title="Bitcoin" description={lang.latest_operations}>
						<CustomLineChart data={dataLineChart('bitcoin')} />
					</Card>
				</div>
				<div className="col-6">
					<Card title="Brita" description={lang.latest_operations}>
						<CustomLineChart data={dataLineChart('brita')} />
					</Card>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<Card title={lang.your_wallet} description={descriptionPie}>
						<PieChartCustom data={dataPieChart('money')} />
					</Card>
				</div>
				<div className="col-6">
					<Card title={lang.your_coins} description={descriptionPie}>
						<PieChartCustom data={dataPieChart('coins')} />
					</Card>
				</div>
			</div>
		</div>
	);
}

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill="var(--blue-light)">
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="var(--green)"
			>{`R$ ${formatMoney(value)}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="var(--blue-light)"
			>
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

function PieChartCustom({ data }) {
	const [activeIndex, setIndex] = useState(0);

	function onPieEnter(data, index) {
		setIndex(index);
	}

	return (
		<ResponsiveContainer width="100%" height={400}>
			<PieChart
				margin={{
					top: 0,
					right: 30,
					left: 50,
					bottom: 5,
				}}
			>
				<Pie
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					data={data}
					cx={200}
					cy={200}
					innerRadius={60}
					outerRadius={80}
					fill="var(--green)"
					dataKey="value"
					onMouseEnter={onPieEnter}
				/>
				<Legend verticalAlign="top" height={36} />
			</PieChart>
		</ResponsiveContainer>
	);
}
