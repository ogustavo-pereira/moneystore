import React from 'react';
import './card.css';

export default function Card({ children, title, description, footer }) {
	return (
		<div className="card">
			<div className="card-header">
				<h5 className="card-title">{title}</h5>
				<p className="card-category">{description}</p>
			</div>
			<div className="card-body">{children}</div>
			{footer && <div className="card-body">{footer}</div>}
		</div>
	);
}
