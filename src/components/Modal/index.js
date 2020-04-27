/**
 * @author oguhpereira
 * Modal Component
 */
import React, { useState } from 'react';

import './modal.css';

/**
 * @function ModalTop
 * @param {String} title
 * @param {String} description
 * @returns {JSX}
 */
function ModalTop({ title, description }) {
	return (
		<div className="modal-top">
			{title && <h1 className="title">{title}</h1>}
			{description && <p className="description">{description}</p>}
		</div>
	);
}

/**
 * @function ModalTop
 * @param {Object} header
 * @param {JSX} children
 * @param {Boolean} hasCloseArea
 * @param {Boolean} visible
 * @returns {JSX}
 */
export default function Modal({ header, children, hasCloseArea, visible }) {
	const [isVisible, setVisible] = useState(visible);
	return isVisible && children ? (
		<div className="modal">
			<div className="modal-box">
				<span className="modal-close" onClick={() => setVisible(false)} />
				<ModalTop {...header} />
				<div className="modal-content">{children}</div>
			</div>
			{hasCloseArea && (
				<div className="modal-close-area" onClick={() => setVisible(false)} />
			)}
		</div>
	) : null;
}
