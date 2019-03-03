import React from 'react'
import SelectListGroup from '../../commons/SelectListGroup';

import { PropertyTypes, Transactions, Rooms, Bathrooms } from '../List_Items/ListsItems';

const EditRE = ({propertyType, transaction, rooms, bathrooms, errors, onchange}) => {
  return (
    <div className="row">
      <div className="col-md-4 col-12">
        <SelectListGroup
          label="Property Type"
          name="propertyType"
          value={propertyType}
          onChange={onchange}
          options={PropertyTypes}
          error={errors.propertyType}
        /> 
      </div>

      <div className="col-md-4 col-12">
        <SelectListGroup
          label="Type of transaction"
          name="transaction"
          value={transaction}
          onChange={onchange}
          options={Transactions}
          error={errors.transaction}
        /> 
      </div>

      <div className="col-md-2 col-12">
        <SelectListGroup
          label="Rooms"
          onChange={onchange}
          name="rooms"
          value={rooms}
          options={Rooms}
          error={errors.rooms}
        />
      </div>

      <div className="col-md-2 col-12">
        <SelectListGroup
          label="Bathrooms"
          name="bathrooms"
          value={bathrooms}
          onChange={onchange}
          options={Bathrooms}
          error={errors.bathrooms}
        /> 
      </div>
    </div>
  )
}

export default EditRE
