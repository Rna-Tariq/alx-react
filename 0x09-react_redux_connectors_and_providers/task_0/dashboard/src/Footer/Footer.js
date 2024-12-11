import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { StyleSheet, css } from "aphrodite";
import { AppContext } from '../App/AppContext';



function Footer() {
	const { user } = useContext(AppContext);
	return (
			<div className={css(styles.Footer)}>
				{user.isLoggedIn && <p><a href="#">Contact us</a></p>}
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
})

export default Footer;
