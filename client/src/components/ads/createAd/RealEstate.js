import React from 'react'

import SelectListGroup from '../../commons/SelectListGroup';
//List Items
import { PropertyTypes, Transactions, Rooms, Bathrooms } from '../List_Items/ListsItems';

const RealEstate = props => {

  const { isActive, propertyType, change, transaction, rooms, bathrooms, errors } = props

  return (
    <div className={!isActive ? 'input-hide' : null}>
      <div className="row">
        <div className="col-md-6 col-12">
          <SelectListGroup
            name="propertyType"
            value={propertyType}
            onChange={change}
            options={PropertyTypes}
            error={errors.propertyType}
          /> 
        </div>

        <div className="col-md-6 col-12">
          <SelectListGroup
            name="transaction"
            value={transaction}
            onChange={change}
            options={Transactions}
            error={errors.transaction}
          /> 
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-12">
          <SelectListGroup
            name="rooms"
            value={rooms}
            onChange={change}
            options={Rooms}
            error={errors.rooms}
          /> 
        </div>

        <div className="col-md-6 col-12">
          <SelectListGroup
            name="bathrooms"
            value={bathrooms}
            onChange={change}
            options={Bathrooms}
            error={errors.bathrooms}
          /> 
        </div>
      </div>

    </div>
  )
}

export default RealEstate
