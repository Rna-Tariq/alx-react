import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Footer({ user }) {
	return (
		<div className={css(styles.Footer)}>
			{user?.isLoggedIn && <p><a href="#">Contact us</a></p>}
			<p>
				Copyright {getFullYear()} - {getFooterCopy(true)}
			</p>
		</div>
	);
}

const styles = StyleSheet.create({
	Footer: {
		borderTop: "3px solid #E0434C",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontStyle: "italic",
		height: "3rem",
		width: "100%",
	}
});

const mapStateToProps = (state) => ({
	user: state.get("user"),
});

Footer.propTypes = {
	user: PropTypes.shape({
		isLoggedIn: PropTypes.bool,
		email: PropTypes.string,
	}),
};

Footer.defaultProps = {
	user: { isLoggedIn: false, email: null },
};

export default connect(mapStateToProps)(Footer);
