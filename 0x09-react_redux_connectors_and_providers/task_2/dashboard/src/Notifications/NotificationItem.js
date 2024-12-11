import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from "aphrodite";


class NotificationItem extends Component {
	constructor(props) {
		super(props);
		this.selectedStyle = this.props.type == 'default' ? itemStyle.default : itemStyle.urgent;
	}
	render() {
		const { type, value, html, markAsRead, id } = this.props;
		return (
			<React.Fragment>
				{type && value ? (
					<li
					onClick={() => markAsRead(id)} 
					data-notification-type={this.props.type}
					className={css(this.selectedStyle)}
					data-testid="notification-item">
						{value}
					</li>
				) : null}
				{html ? (
					<li
						onClick={() => markAsRead(id)}
						data-urgent
						dangerouslySetInnerHTML={{ __html: html }}
						className={css(this.selectedStyle)}
						data-testid="notification-item"></li>
				) : null}
			</React.Fragment>
		);
	}
}

const itemStyle = StyleSheet.create({
	li: {
		'@media (max-width: 900px)': {
			listStyle: 'none',
			borderBottom: '1px solid black',
			padding: '10px 8px',
			margin: 0,
			width: '100%',
			fontSize: '20px'
		}
	},
	urgent: {
		color: 'red'
	},
	default: {
		color: 'blue'
	}
})

NotificationItem.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.string,
	__html: PropTypes.shape({
		html: PropTypes.string,
		markAsRead: PropTypes.func,
		id: PropTypes.number,
	}),
};

NotificationItem.defaultProps = {
	type: 'default',
	markAsRead: () => {},
	id: 0
};

export default NotificationItem;