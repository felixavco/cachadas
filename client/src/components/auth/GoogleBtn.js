import React, { Component } from 'react'

class GoogleBtn extends Component {
  render() {
    return (
      <div className="mt-3">
      <p className="text-center"> Or access with your Google Account </p>
      <form action="http://localhost:5000/api/user/google" method="GET">
        <button type="submit" className="btn btn-danger btn-block google-btn">
          Google <i className="fab fa-google-plus-g"/>
        </button>
      </form>
      </div>
    )
  }
}

export default GoogleBtn
