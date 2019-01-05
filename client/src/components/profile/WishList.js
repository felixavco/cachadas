import React, { Component } from 'react'

//Components
import ProfileTemplate from './ProfileTemplate'

class WishList extends Component {
  render() {
    return (
      <ProfileTemplate>
        <div className="my-wish-list">
        <h1>My Wish List</h1>
        </div>
      </ProfileTemplate>
    )
  }
}

export default WishList
