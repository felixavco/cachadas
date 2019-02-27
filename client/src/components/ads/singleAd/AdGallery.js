import React from 'react'

const AdGallery = ({images}) => {

  let indicators = images.map((image, i) => (
    <li key={i} data-target="#postGallery" data-slide-to="0" className={i === 0 ? 'active' : null}></li>
  ))

  let gallery_Images = images.map((image, i) => (
    <div key={i} className={`carousel-item ${i === 0 ? 'active' : null}`}>
      <img className="d-block w-100" src={`/${image}`} alt={image}/>
    </div>
  ))

  return (
    <div id="postGallery" className="carousel slide mb-3" data-ride="carousel">

      <ol className="carousel-indicators">
        { indicators }
      </ol>

      <div className="carousel-inner">
        { gallery_Images }
      </div>

      <a className="carousel-control-prev" href="#postGallery" role="button" data-slide="prev">
        <i className="far fa-arrow-alt-circle-left"/>
        <span className="sr-only">Previous</span>
      </a>

      <a className="carousel-control-next" href="#postGallery" role="button" data-slide="next">
        <i className="far fa-arrow-alt-circle-right"/>
        <span className="sr-only">Next</span>
      </a>

    </div>
  )
}

export default AdGallery

