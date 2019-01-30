import React from 'react'
//Components
import TextFieldGroup from '../../commons/TextFieldGroup';
import SelectListGroup from '../../commons/SelectListGroup';
import TextAreaFieldGroup from '../../commons/TextAreaFieldGroup';
//Lists Items
import { categories } from '../List_Items/ListsItems';


const EditInfo = ({title, price, category, description, contactEmail, contactPhone, onchange, errors}) => {

  

  return (
    <div className="edit-info">
      <div className="row">

        <div className="col-md-5 col-12">
          <TextFieldGroup 
            label="Title"
            placeholder="* Title" 
            name="title" 
            value={title} 
            onChange={onchange} 
            error={errors.title}
          />
        </div>

        <div className="col-md-4 col-12">
          <SelectListGroup
            label="Category"
						name="category"
						value={category}
						onChange={onchange}
            options={categories}
            error={errors.category}
					/>
        </div>

        <div className="col-md-3 col-12">
          <TextFieldGroup 
            label="Price"
            placeholder="* Price" 
            name="price" 
            type="number"
            value={price.toString()} 
            onChange={onchange} 
            error={errors.price}
          />
        </div>

      </div>

      <div className="row">
        <div className="col-md-8 col-12 edit-textarea">
          <TextAreaFieldGroup
            label="Description"
            placeholder="* Description"
            name="description"
            value={description}
            onChange={onchange}
            error={errors.description}
          />
        </div>

        <div className="col-md-4 col-12">
          <TextFieldGroup 
            label="Contact Email"
            placeholder="* Contact Email" 
            name="contactEmail" 
            value={contactEmail} 
            onChange={onchange} 
            type="email"
            error={errors.contactEmail}
          />

          <TextFieldGroup 
            label="Contact Phone"
            placeholder="* Contact Phone" 
            name="contactPhone" 
            value={contactPhone} 
            onChange={onchange} 
            error={errors.contactPhone}
          />
        </div>
      </div>
    </div>
  )
}

export default EditInfo
