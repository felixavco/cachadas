import React from 'react'

import SelectListGroup from '../../commons/SelectListGroup';
import TextFieldGroup from '../../commons/TextFieldGroup';
//List Items
import { carMaker, Types, Transmisions, GAS, Year } from '../List_Items/ListsItems';

const Vehicle = ({ isActive, make, errors, year, change, gas, model, type, transmision }) => {

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
        <SelectListGroup
            name="gas"
            value={gas}
            onChange={change}
            options={GAS}
            error={errors.gas}
          /> 
      </div>
     </div>
    </div>
  )
}

export default Vehicle
