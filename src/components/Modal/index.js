/**
 * @author oguhpereira
 * Modal Component
 */
import React from 'react';

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
export default function Modal({
	header,
	children,
	hasCloseArea,
	visible,
	callback,
}) {
	function handleVisible() {
		callback(false);
	}
	return visible && children ? (
		<div className="modal">
			<div className="modal-box">
				<span className="modal-close" onClick={() => handleVisible(false)} />
				<ModalTop {...header} />
				<div className="modal-content">{children}</div>
			</div>
			{hasCloseArea && (
				<div
					className="modal-close-area"
					onClick={() => handleVisible(false)}
				/>
			)}
		</div>
	) : null;
}
