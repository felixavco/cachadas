import React from 'react';

import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';

const CreateAdPage1 = (props) => {
	const { isActive, title, description, category, price, errors, change } = props;

	const options = [
		{ label: '* Select a category', value: 0 },
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
			<TextFieldGroup placeholder="* Title" name="title" value={title} onChange={change} error={errors.title} />

			<div className="row">
				<div className="col-md-9 col-12">
					<SelectListGroup
						name="category"
						value={category}
						onChange={change}
						error={errors.category}
						options={options}
					/>
				</div>
        
        <div className="col-md-3 col-12">
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
				name={description}
				value={description}
				onChange={change}
				error={errors.description}
			/>
		</div>
	);
};

export default CreateAdPage1;
