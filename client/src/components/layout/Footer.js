import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="bg-primary mt-4">
			<div className="container">
				<div className="row pt-4">
					<div className="col-lg-6 col-12">
						<nav>
							<ul className="footer-nav">
								<li>
									<Link to="/contact">
										<i className="far fa-envelope"/>&nbsp;Contact Us  
									</Link>
								</li>
								<li>
									<Link to="/contact">
									<i class="far fa-question-circle"/>&nbsp;About Us  
									</Link>
								</li>
								<li>
									<Link to="/contact">
										<i className="far fa-envelope"/>&nbsp;Contact Us  
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-lg-6 col-12">
						<nav className="social-nav">
							<ul className="footer-social">
								<li>
									<a href="#"><i class="fab fa-facebook-square"/></a>
								</li>
								<li>
									<a href="#"><i class="fab fa-twitter"/></a>
								</li>
								<li>
									<a href="#"><i class="fab fa-instagram"/></a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
			<div className="py-4 footer-bottom">
				<Link to="/">
					<h5 className="text-center">
						Cachadas.com &copy; {new Date().getFullYear()}
					</h5>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
