import React from 'react'

import SelectListGroup from '../commons/SelectListGroup';
import TextFieldGroup from '../commons/TextFieldGroup';

const Vehicle = props => {

  const carMaker = [
    {label: '* Select Maker', value: 'make'},
		{ label: 'Acura', value: 'Acura' },
		{ label: 'Audi', value: 'Audi' },
		{ label: 'BMW', value: 'BMW' },
		{ label: 'Chevrolet', value: 'Chevrolet' },
		{ label: 'Chrysler', value: 'Chrysler' },
		{ label: 'Dodge', value: 'Dodge' },
		{ label: 'Ford', value: 'Ford' },
		{ label: 'Freightliner', value: 'Freightliner' },
		{ label: 'Hero', value: 'Hero' },
		{ label: 'Honda', value: 'Honda' },
		{ label: 'Hyundai', value: 'Hyundai' },
		{ label: 'Isuzu', value: 'Isuzu' },
		{ label: 'Jeep', value: 'Jeep' },
		{ label: 'Kia', value: 'Kia' },
		{ label: 'Lexus', value: 'Lexus' },
		{ label: 'Mack', value: 'Mack' },
		{ label: 'Mazda', value: 'Mazda' },
		{ label: 'Mercedes Benz', value: 'Mercedes Benz' },
		{ label: 'Mitsubishi', value: 'Mitsubishi' },
		{ label: 'Nissan', value: 'Nissan' },
		{ label: 'Porsche', value: 'Porsche' },
		{ label: 'Renault', value: 'Renault' },
		{ label: 'Susuki', value: 'Susuki' },
		{ label: 'Toyota', value: 'Toyota' },
		{ label: 'Volkswagen', value: 'Volkswagen' },
		{ label: 'Volvo', value: 'Volvo' },
		{ label: 'Yamaha', value: 'Yamaha' },
		{ label: 'Other', value: 'Other' },
  ];

  let y = new Date().getFullYear();
  let i = y - 35
  const Years = []

  for(i ; i <= y; i++) {
    Years.unshift({label: i, value: i})
  }
  const Year = [{label: '* Select Year', value: 'year'}, ...Years]

  const Types = [
    {label: '* Select Type', value: 'type'},
    {label: 'Sedan, SUV, Compact', value: 'vehicle'},
    {label: 'Motorcycle', value: 'Motorcycle'},
    {label: 'Truck', value: 'Truck'}
  ]

  const Transmisions = [
    {label: '* Transmision Type', value: 'transmision'},
    {label: 'Automatic', value: 'Automatic'},
    {label: 'Manual', value: 'Manual'}
  ]
  
  const { isActive, make, errors, year, change, odometer, model, type, transmision } = props

  return (
    <div className={!isActive ? 'input-hide' : null}>

      <div className="row">
        <div className="col-md-6 col-12">
          <SelectListGroup
            name="type"
            value={type}
            onChange={change}
            options={Types}
            error={errors.type}
          /> 
        </div>

        <div className="col-md-6 col-12">
          <SelectListGroup
            name="transmision"
            value={transmision}
            onChange={change}
            options={Transmisions}
            error={errors.transmision}
          /> 
        </div>
      </div>
  
      <div className="row">
      <div className="col-md-6 col-12">
        <SelectListGroup
          name="make"
          value={make}
          onChange={change}
          options={carMaker}
          error={errors.make}
        /> 
      </div>

      <div className="col-md-6 col-12">
        <SelectListGroup
          name="year"
          value={year}
          onChange={change}
          options={Year}
          error={errors.year}
        /> 
      </div>
     </div>

     <div className="row">
      <div className="col-md-6 col-12">
        <TextFieldGroup
          placeholder="Model"
          name="model"
          value={model}
          onChange={change}
          error={errors.model}
        />
      </div>
      <div className="col-md-6 col-12">
        <TextFieldGroup
          placeholder="Odometer?"
          name="odometer"
          type="number"
          value={odometer}
          onChange={change}
          error={errors.odometer}
        />
      </div>
     </div>
    </div>
  )
}

export default Vehicle
