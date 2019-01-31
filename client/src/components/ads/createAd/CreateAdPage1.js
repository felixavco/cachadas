import React from 'react';

import TextFieldGroup from '../../commons/TextFieldGroup';
import TextAreaFieldGroup from '../../commons/TextAreaFieldGroup';
import SelectListGroup from '../../commons/SelectListGroup';
//List Items
import { categories } from '../List_Items/ListsItems'

const CreateAdPage1 = ({ isActive, title, description, category, price, errors, contactEmail, contactPhone, change }) => {

	return (
		<div className={!isActive ? 'input-hide' : null}>
		
			<TextFieldGroup 
				placeholder="* Title" 
				name="title" 
				value={title} 
				onChange={change} 
				error={errors.title} 
			/>

			<div className="row">
				<div className="col-md-6 col-12">

				<TextFieldGroup 
					placeholder="* Contact Phone" 
					name="contactPhone" 
					value={contactPhone} 
					onChange={change} 
					error={errors.contactPhone} 
				/>

				</div>
				<div className="col-md-6 col-12">
				
				<TextFieldGroup 
					placeholder="* Contact Email" 
					name="contactEmail" 
					value={contactEmail} 
					onChange={change} 
					error={errors.contactEmail} 
				/>

				</div>
			</div>

			<div className="row">
				<div className="col-md-8 col-12">
					<SelectListGroup
						name="category"
						value={category}
						onChange={change}
						error={errors.category}
						options={categories}
					/> 
				</div>
        
        <div className="col-md-4 col-12">
          <TextFieldGroup
            placeholder="* Price"
            name="price"
            type="number"
            value={price}
            onChange={change}
            error={errors.price}
          />
        </div>
			</div>

			<TextAreaFieldGroup
				placeholder="* Description"
				name="description"
				value={description}
				onChange={change}
				error={errors.description}
			/>
			
		</div>
	);
};

export default CreateAdPage1;
