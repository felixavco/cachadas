import React from 'react'
import NotFoundImg from '../../img/NotFound.gif'

const NotFound = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={NotFoundImg}
          alt="Not Found"
        />
      </div>
      <div className="col-md-6 pt-5">
        <h1 className="display-1 text-center mt-5">
          404 <i class="far fa-frown-open" />
        </h1>
        <h3 className="display-4 text-center my-3">PAGE NOT FOUND</h3>
        <div className="text-center">
        </div>
      </div>
    </div>
  )
}

export default NotFound