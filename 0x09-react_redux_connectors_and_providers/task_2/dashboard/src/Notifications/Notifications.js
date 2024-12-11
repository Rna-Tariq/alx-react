import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

class Notifications extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			displayDrawer,
			listNotifications,
			handleDisplayDrawer,
			handleHideDrawer,
			markNotificationAsRead,
		} = this.props;
		return (
			<React.Fragment>
				<div className={css(styles.menuItem)} 
					data-testid="menuItem"
					onClick={handleDisplayDrawer}>
					<p>Your notifications</p>
				</div>
				{displayDrawer && (
					<div className={css(styles.Notifications)} data-testid="notifications">
						<button style={{ float: 'right' }}
							aria-label="Close"
							onClick={handleHideDrawer}
							data-testid="Close Notifications">
							<img src={closeIcon} alt="close icon" width="10px" />
						</button>
						<p>Here is the list of notifications</p>
						<ul>
							{listNotifications.length == 0 ? (<NotificationItem value="No new notification for now" />)
								: (listNotifications.map((notification) => {
									return <NotificationItem
										type={notification.type}
										value={notification.value}
										html={notification.html}
										markAsRead={markNotificationAsRead}
										key={notification.id}
									/>
								}))
							}
						</ul>
					</div>
				)}
			</React.Fragment>
		);
	}
}

const opacityAnim = {
	'0%': { opacity: 0.5 },
	'100%': { opacity: 1}
};

const bounceAnim = {
	'0%': { transform: 'translateY(0px)' },
	'33%': { transform: 'translateY(-5px)'},
	'66%': { transform: 'translateY(5px)'},
	'100%': { transform: 'translateY(0px)'},
};

const styles = StyleSheet.create({
	Notifications: {
		'@media (max-width: 900px)': {
			width: "100%",
			padding: "0px",
			fontSize: 20,
			position: "relative",
			right: 0,
			left: 0,
			border: "none",
		},
		padding: "1em",
		border: "2px dashed red",
		position: "absolute",
		top: "1.8em",
		right: "0",
	},

	"notification-header": {
		display: "flex",
		justifyContent: "space-between",
	},

	menuItem: {
		textAlign: "right",
		':hover': {
			cursor: 'pointer',
			animationName: [opacityAnim, bounceAnim],
			animationDuration: '1s, 0.5s',
			animationIterationCount: '3'
		}
	},
	ul: {
		'@media (max-width: 900px)': {
			padding: 0,
		}
	},
	button: {
		'@media (max-width: 900px)': {
			position: 'relative',
			float: 'right',
		}
	},
});

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	listNotifications: PropTypes.arrayOf(NotificationItemShape),
	handleDisplayDrawer: PropTypes.func,
	handleHideDrawer: PropTypes.func,
	markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
	handleDisplayDrawer: () => {},
	handleHideDrawer: () => {},
	markNotificationAsRead: () => {},
};

export default Notifications;