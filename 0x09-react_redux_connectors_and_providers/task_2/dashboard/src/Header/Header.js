import React from 'react';
import { connect } from 'react-redux';
import logo from '../assets/Holberton-Logo.jpg';
import { StyleSheet, css } from "aphrodite";
import { logout } from '../actions/uiActionCreators';

function Header({ user, logout }) {
	return (
		<>
			<header className={css(styles.Header)}>
				<img className={css(styles.img)} src={logo} alt='Holberton' />
				<h1 className={css(styles.h1)}>School dashboard</h1>
			</header>
			{user.isLoggedIn && (
				<section id="logOutSec">
					<h2>
						Welcome
						<strong>{user.email}</strong>
						<em>
							<a href='#' onClick={logout}>logout</a>
						</em>
					</h2>
				</section>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	Header: {
		fontSize: "1.4rem",
		color: "#e0354b",
		display: "flex",
		alignItems: "center",
		borderBottom: "3px solid #e0354b",
	},
	img: {
		width: "250px",
		height: "250px",
	}
});

const mapStateToProps = (state) => ({
	user: state.get("user")
});

const mapDispatchToProps = {
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);