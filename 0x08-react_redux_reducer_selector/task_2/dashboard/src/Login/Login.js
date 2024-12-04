import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, css } from "aphrodite";

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [enableSubmit, setEnableSubmit] = useState(false);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		props.logIn(e.target.elements.email.value, e.target.elements.password.value);
	};
	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	useEffect(() => {
		if (email != '' && password != '') {
			setEnableSubmit(true);
		} else {
			if (enableSubmit != false) {
				setEnableSubmit(false);
			}
		}
	}, [email, password]);

	return (
		<div className={css(styles['App-body'])} data-testid="login-component">
			<p>Login to access the full dashboard</p>
			<form onSubmit={handleLoginSubmit} >
				<label htmlFor="email">Email: </label>
				<input type="email" id="email" name="email" className={styles.inputs} value={email} onChange={handleChangeEmail} />
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" name="password" className={styles.input} value={password} onChange={handleChangePassword} />
				<input type="submit" value="Ok" disabled={!enableSubmit} />
			</form>
		</div>
	);
}

const styles = StyleSheet.create({
	"App-body": {
		'@media (max-width: 900px)': {
			display: 'flex',
			flexDirection: 'column'
		},
		fontSize: "1rem",
		padding: "2em",
		height: "45%",
	},

	input: {
		margin: "10px",
		display: "flex",
		alignItems: "center",
	},
});

Login.propTypes = {
	logIn: PropTypes.func
};

export default Login;
