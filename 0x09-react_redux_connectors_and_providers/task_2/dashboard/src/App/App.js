import React, { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PropTypes from "prop-types";
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest } from "../actions/uiActionCreators";

export class App extends Component {
	constructor(props) {
		super(props);

		this.listCourses = [
			{ id: 1, name: 'ES6', credit: 60 },
			{ id: 2, name: 'Webpack', credit: 20 },
			{ id: 3, name: 'React', credit: 40 },
		];

		this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

		this.state = {
			listNotifications: [
				{ id: 1, value: "New course available", type: "default" },
				{ id: 2, value: "New resume available", type: "urgent" },
				{ id: 3, html: { __html: getLatestNotification() }, type: "urgent" },
			],
		};
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (event) => {
		if (event.ctrlKey && event.key === 'h') {
			alert('Logging you out');
			this.props.logOut();
		}
	};

	markNotificationAsRead(id) {
		this.setState((prevState) => ({
			listNotifications: prevState.listNotifications.filter(
				(notification) => notification.id !== id
			),
		}));
	}

	render() {
		const { listNotifications } = this.state;
		const {
			isLoggedIn,
			displayDrawer,
			displayNotificationDrawer,
			hideNotificationDrawer,
			login,
		} = this.props;

		return (
			<React.Fragment>
				<div className={css(styles.App)} data-testid="app">
					<div className="heading-section">
						<Notifications
							listNotifications={listNotifications}
							displayDrawer={displayDrawer}
							handleDisplayDrawer={displayNotificationDrawer}
							handleHideDrawer={hideNotificationDrawer}
							markNotificationAsRead={this.markNotificationAsRead}
						/>
						<Header />
					</div>
					{isLoggedIn ? (
						<BodySectionWithMarginBottom title="Course list">
							<CourseList listCourses={this.listCourses} data-testid="course-list" />
						</BodySectionWithMarginBottom>
					) : (
						<BodySectionWithMarginBottom title="Log in to continue">
							<Login logIn={login} />
						</BodySectionWithMarginBottom>
					)}
					<BodySection title="News from the school">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perspiciatis at tempora odio, necessitatibus repudiandae reiciendis
							cum nemo sed asperiores ut molestiae eaque aliquam illo ipsa iste
							vero dolor voluptates.
						</p>
					</BodySection>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	App: {
		height: "100vh",
		maxWidth: "100vw",
		position: "relative",
		fontFamily: "Arial, Helvetica, sans-serif",
	},
});

App.propTypes = {
	isLoggedIn: PropTypes.bool,
	logOut: PropTypes.func,
	displayNotificationDrawer: PropTypes.func,
	hideNotificationDrawer: PropTypes.func,
	login: PropTypes.func,
};

App.defaultProps = {
	isLoggedIn: false,
	logOut: () => { },
	displayNotificationDrawer: () => { },
	hideNotificationDrawer: () => { },
	login: () => { },
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.get("isUserLoggedIn"),
		displayDrawer: state.get("isNotificationDrawerVisible"),
	};
};

const mapDispatchToProps = {
	displayNotificationDrawer,
	hideNotificationDrawer,
	login: loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
