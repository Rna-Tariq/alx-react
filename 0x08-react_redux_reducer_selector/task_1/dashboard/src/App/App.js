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

const listCourses = [
	{ id: 1, name: "ES6", credit: 60 },
	{ id: 2, name: "Webpack", credit: 20 },
	{ id: 3, name: "React", credit: 40 },
];


class App extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.listCourses = [
			{ id: 1, name: 'ES6', credit: 60 },
			{ id: 2, name: 'Webpack', credit: 20 },
			{ id: 3, name: 'React', credit: 40 }
		];

		this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
		this.handleHideDrawer = this.handleHideDrawer.bind(this);
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
				{ id: 3, html: {__html: getLatestNotification()}, type: "urgent"},
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

	handleDisplayDrawer() {
		this.setState({ displayDrawer: true });
	}

	handleHideDrawer() {
		this.setState({ displayDrawer: false });
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
		const newList = this.state.listNotifications.filter(not => not.id !== id);
		this.setState({ listNotifications: newList });
	}

	render() {
		return (
			<AppContext.Provider value={{
				user: this.state.user,
				logOut: this.state.logOut
			}}>
				<React.Fragment>
					<div className={css(styles.App)} data-testid="app">
						<div className="heading-section">

							<Notifications
								listNotifications={this.state.listNotifications}
								markNotificationAsRead={this.markNotificationAsRead}
								displayDrawer={this.state.displayDrawer}
								handleDisplayDrawer={this.handleDisplayDrawer}
								handleHideDrawer={this.handleHideDrawer} />
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
};

App.defaultProps = {
	isLoggedIn: false,
	logOut: () => { },
};

export default App;