import React, { Component } from 'react';
import BodySection from './BodySection';
import PropTypes from 'prop-types';
import { StyleSheet, css} from "aphrodite";

class BodySectionWithMarginBottom extends Component {
	render() {
		return (
			<div className={css(styles.bodySectionWithMarginBottom)}>
				<BodySection {...this.props} />
			</div>
		);
	}
};

const styles = StyleSheet.create({
	bodySectionWithMarginBottom: {
		marginBottom: "40",
	},
})

BodySectionWithMarginBottom.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default BodySectionWithMarginBottom;