import React from 'react'
import { Link } from 'react-router-dom';

const singleAdCard = ({id, title, price, image}) => {
  return (
    <Link to={`/post/${id}`}>
      <div className="single-post-card">
        <div className="img-cont">
          <img src={ image } alt="img"/>
        </div>
        <div className="info-cont">
          <h4 className="title mx-2 mb-5">{ title }</h4>
          <h5 className="price mr-4 mt-4 p-3">$ { price }</h5>
        </div>
      </div>
    </Link>
    
  )
}

export default singleAdCard
