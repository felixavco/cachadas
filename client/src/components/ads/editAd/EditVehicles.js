import React, { Fragment } from 'react'
import SelectListGroup from '../../commons/SelectListGroup';
import TextFieldGroup from '../../commons/TextFieldGroup';
//List Items
import { carMaker, Types, Transmisions, GAS, Year } from '../List_Items/ListsItems';


const EditVehicles = ({make, model, year, gas, transmision, type, onchange, errors}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4 col-12">
          <SelectListGroup
            label="Type"
            name="type"
            value={type}
            onChange={onchange}
            options={Types}
            error={errors.type}
          /> 
        </div>

        <div className="col-md-4 col-12">
          <SelectListGroup
            label="Make"
            name="make"
            value={make}
            onChange={onchange}
            options={carMaker}
            error={errors.make}
          />
        </div>

        <div className="col-md-4 col-12">
          <SelectListGroup
            label="Transmission"
            name="transmision"
            value={transmision}
            onChange={onchange}
            options={Transmisions}
            error={errors.transmision}
          /> 
        </div>

      </div>

      <div className="row">
        <div className="col-md-4 col-12">
          <TextFieldGroup
            label="Model"
            placeholder="Model"
            name="model"
            value={model}
            onChange={onchange}
            error={errors.model}
          />
        </div>

        <div className="col-md-4 col-12">
          <SelectListGroup
            label="Year"
            name="year"
            value={year}
            onChange={onchange}
            options={Year}
            error={errors.year}
          /> 
        </div>

        <div className="col-md-4 col-12">
          <SelectListGroup
              label="Fuel type"
              name="gas"
              value={gas}
              onChange={onchange}
              options={GAS}
              error={errors.gas}
            /> 
        </div>

      </div>
    </Fragment>
  )
}

export default EditVehicles

