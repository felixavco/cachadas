import React from 'react'

const singleAdCard = ({title, price, image}) => {
  return (
    <div className="single-post-card">
      <div className="img-cont">
        <img src={ image } alt="img"/>
      </div>
      <div className="info-cont">
        <h4 className="title mx-2 mb-5">{ title }</h4>
        <h5 className="price mr-4 mt-4 p-3">$ { price }</h5>
      </div>
    </div>
  )
}

export default singleAdCard
