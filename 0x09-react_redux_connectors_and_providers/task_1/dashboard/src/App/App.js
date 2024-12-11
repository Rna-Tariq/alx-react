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
import { user, AppContext } from './AppContext';
import { connect } from "react-redux";
import { displayNotificationDrawer, hideNotificationDrawer } from "../actions/uiActionCreators";

export class App extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.listCourses = [
			{ id: 1, name: 'ES6', credit: 60 },
			{ id: 2, name: 'Webpack', credit: 20 },
			{ id: 3, name: 'React', credit: 40 }
		];

		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
		this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

		this.state = {
			displayDrawer: false,
			user: user,
			logOut: this.logOut,
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

	handleKeyDown(event) {
		if (event.ctrlKey && event.key === 'h') {
			alert('Logging you out');
			this.state.logOut();
		}
	}

	logIn(email, password) {
		this.setState({
			user: {
				email,
				password,
				isLoggedIn: true
			}
		});
	}

	logOut() {
		this.setState({
			user: user
		});
	}

	markNotificationAsRead(id) {
		this.setState(prevState => ({
			...prevState,
			listNotifications: prevState.listNotifications.filter(
				notification => notification.id !== id
			)
		}));
	}

	render() {
		const { user, logOut, listNotifications } = this.state;

		const {
			isLoggedIn,
			displayDrawer,
			displayNotificationDrawer,
			hideNotificationDrawer,
		} = this.props;

		const value = { user, logOut };
		return (
			<AppContext.Provider value={value}>
				<React.Fragment>
					<div className={css(styles.App)} data-testid="app">
						<div className="heading-section">

							<Notifications
								listNotifications={listNotifications}
								displayDrawer={displayDrawer}
								handleDisplayDrawer={displayNotificationDrawer}
								handleHideDrawer={hideNotificationDrawer}
								markNotificationAsRead={this.markNotificationAsRead} />
							<Header />
						</div>
						{this.state.user.isLoggedIn ? (
							<BodySectionWithMarginBottom title="Course list">
								<CourseList listCourses={this.listCourses} data-testid="course-list" />
							</BodySectionWithMarginBottom>
						) : (
							<BodySectionWithMarginBottom title="Log in to continue">
								<Login logIn={this.logIn} />
							</BodySectionWithMarginBottom>
						)}
						<BodySection title='News from the school'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Perspiciatis at tempora odio, necessitatibus repudiandae
								reiciendis cum nemo sed asperiores ut molestiae eaque aliquam illo
								ipsa iste vero dolor voluptates.
							</p>
						</BodySection>
						<Footer />
					</div>
				</React.Fragment>
			</AppContext.Provider>
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
};

App.defaultProps = {
	isLoggedIn: false,
	logOut: () => { },
	displayNotificationDrawer: () => { },
	hideNotificationDrawer: () => { },
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
