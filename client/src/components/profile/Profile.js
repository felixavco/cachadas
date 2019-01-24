import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProfileTemplate from './ProfileTemplate'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'


//Redux 
import { connect } from 'react-redux'

class Profile extends Component {

  render() {
    const { email, public_email, firstName, lastName, phone } = this.props.auth.user

    return (
      <ProfileTemplate>
        <Helmet>
          <title>{firstName} {lastName}</title>
        </Helmet>
       <div className="profile-info">
        <h1 className="display-4 text-center">{firstName} {lastName}</h1>
        <hr/>
        <div className="container mx-5">
          <p className="lead"><span><i className="fas fa-at"/> Email: </span>{email}</p>
          <p className="lead"><span><i className="fas fa-at"/> Public Email *: </span>{!public_email ? (<Link to="/edit-profile">Edit Profile</Link>) : public_email}</p>
          <p className="lead"><span><i className="fas fa-phone"/> Public Phone *: </span>{!phone ? (<Link to="/edit-profile">Edit Profile</Link>) : phone}</p>
        </div>
        <small className="mt-3 mx-5">* Visible on your public Ads</small>
       </div>
      </ProfileTemplate>
    )
  }
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Profile)
