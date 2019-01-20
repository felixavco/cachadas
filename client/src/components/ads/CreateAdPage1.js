import React from 'react';

import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';

const CreateAdPage1 = (props) => {
	const { isActive, title, description, category, price, errors, contactEmail, contactPhone, change, imagesOnChange } = props;

	const options = [
		{ label: '* Select a category', value: "none" },
		{ label: 'Smart Phones & Tablets', value: 'smartphones' },
		{ label: 'Computers and Electronics', value: 'electronics' },
		{ label: 'Cars & Motorcycles', value: 'vehicles' },
		{ label: 'Real Estate', value: 'real_estate' },
		{ label: 'Clothing & Accessories', value: 'clothing' },
		{ label: 'Services', value: 'services' },
		{ label: 'Food & Drinks', value: 'food' },
		{ label: 'Other', value: 'other' }
	];

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
						options={options}
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
			<div className="mx-auto">
				<input onChange={imagesOnChange} type="file" name="images" id="images" multiple accept="image/jpg, image/jpeg, image/png"/>
			</div>
		</div>
	);
};

export default CreateAdPage1;
