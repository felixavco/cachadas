import React, { Fragment } from 'react';

const AdInfo = ({ owner, category, description, contactEmail, contactPhone, make, model, year, gas, type, propertyType, transaction, rooms, bathrooms }) => {

  const name = `${owner.firstName} ${owner.lastName}`

  let content = null;
  
	switch (category) {
		case 'vehicles':
			content = (
        <Fragment>
          <h6 className="text-success mb-2"><span><i className="fas fa-car"/></span> &nbsp; Vehicle Information</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              <p><strong>Make: </strong>{make}</p>
            </div>
            <div className="col-md-6 col-12">
              <p><strong>Model: </strong>{model}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              <p><strong>Year: </strong>{year}</p>
            </div>
            <div className="col-md-4 col-12">
              <p><strong>Fuel?: </strong>{gas}</p>
            </div>
            <div className="col-md-4 col-12">
              <p><strong>Type: </strong>{type}</p>
            </div>
          </div>
          <hr/>
        </Fragment>
      );
			break;

		case 'real_estate':
			content = (
        <Fragment>
          <h6 className="text-success mb-2"><span><i className="fas fa-home"/></span> &nbsp; Property Information</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              <p><strong>Propety Type: </strong>{propertyType}</p>
            </div>
            <div className="col-md-6 col-12">
              <p><strong>Transaction Type: </strong>{transaction}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <p><strong>Rooms: </strong>{rooms}</p>
            </div>
            <div className="col-md-6 col-12">
              <p><strong>Bathrooms: </strong>{bathrooms}</p>
            </div>
          </div>
          <hr/>
        </Fragment>
      )
			break;
	}

	return (
		<div>
      <h6 className="text-success mb-2"><span><i className="fas fa-user-circle"/></span> &nbsp; Contact Information</h6>
			<p>
				<strong>Seller: </strong>{name}
			</p>
      <div className="row">
        <div className="col-md-6 col-12">
          <p>
            <strong>Phone: </strong><a href={`tel:+${contactPhone}`}>{contactPhone}</a>
          </p>
        </div>
        <div className="col-md-6 col-12">
          <p>
            <strong>Email: </strong><a href={`mailto:${contactEmail}`} target="_blank" rel="noopener noreferrer">{contactEmail}</a>
            </p>
          </div>
      </div>
			<hr />
			{content}
			<h6 className="text-success mb-2"><span><i className="fas fa-info-circle"/></span> &nbsp; Description</h6>
			<p>{description}</p>
		</div>
  );
};

export default AdInfo;
