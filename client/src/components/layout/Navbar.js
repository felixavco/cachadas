import React, { Component } from 'react';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<a className="navbar-brand" href="#">
					Cachadas.com
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarColor01">
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control ml-sm-0" type="text" placeholder="Search" />
					</form>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<a className="nav-link" href="#">
								Home <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Login
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Register
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
