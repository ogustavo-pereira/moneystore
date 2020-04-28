import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

export default function Card({ children, title, description, footer }) {
	return (
		<div className="card">
			<div className="card-header">
				<h5 className="card-title">{title}</h5>
				{description && <p className="card-category">{description}</p>}
			</div>
			<div className="card-body">{children}</div>
			{footer && <div className="card-body">{footer}</div>}
		</div>
	);
}

Card.propTypes = {
	children: PropTypes.element.isRequired,
	description: PropTypes.string,
	footer: PropTypes.element,
	title: PropTypes.string.isRequired,
};
