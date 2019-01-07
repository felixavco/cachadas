import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Avatar = props => {
	return (
		<li className="nav-item dropdown">
			<a
				className="nav-link dropdown-toggle"
				href="#"
				id="navbarDropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
			<img className="avatar-img" src={props.avatarImg} alt={props.name}/>	{props.name}
			</a>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<Link className="dropdown-item" to="/profile">
          Profile &nbsp; <i className="fas fa-user-alt"/> 
				</Link>
        <Link className="dropdown-item" to="/profile">
          Wish List &nbsp; <i className="fas fa-heart"/>
				</Link>
        <Link className="dropdown-item" to="/profile">
          My Ads &nbsp; <i className="fab fa-adversal"/>
				</Link>
				<Link className="dropdown-item" to="/account-settings">
					Settings  &nbsp; <i className="fas fa-cog"/>
				</Link>
        <span className="dropdown-item" onClick={props.onClick} style={{cursor: 'pointer'}}>
					Logout &nbsp; <i className="fas fa-sign-out-alt"/>
				</span>
			</div>
		</li>
	);
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatarImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Avatar;
