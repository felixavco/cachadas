import React from 'react'

import SelectListGroup from '../commons/SelectListGroup';

const RealEstate = props => {

  const PropertyTypes = [
    {label: "* Select Prolerty Type", value: 'propertyType'},
    {label: "House", value: 'House'},
    {label: "Room", value: 'Room'},
    {label: "Apartment", value: 'Apartment'},
    {label: "Terrain", value: 'Terrain'},
  ]

  const Transactions = [
    {label: 'Sell', value: 'Sell'},
    {label: 'Rent', value: 'Rent'},
    {label: 'Buy', value: 'Buy'}
  ]

  const Rooms = [
    {label: '* Rooms', value: 'rooms'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '+5', value: '+5'},
  ]

  const Bathrooms = [
    {label: '* Bathrooms', value: 'bathrooms'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '+4', value: '+4'},
  ]


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
