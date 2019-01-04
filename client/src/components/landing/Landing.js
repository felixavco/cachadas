import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'

class Landing extends Component {
	render() {
		return (
			<Fragment>
				<Helmet>
					<title>Cachadas.com</title>
				</Helmet>

				<div>
					<h1>Landing</h1>
				</div>
			</Fragment>
		);
	}
}

export default Landing;
