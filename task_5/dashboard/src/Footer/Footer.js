import React from 'react';
import '../App/App.css';
import { getFullYear, getFooterCopy } from '../utils/utils';

function Footer() {
	return (
			<div className='App-footer'>
				<p>
					Copyright {getFullYear()} - {getFooterCopy(true)}
				</p>
			</div>
	);
}

export default Footer;
