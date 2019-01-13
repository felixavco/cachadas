import React, { Component } from 'react';
import Helment from 'react-helmet';

//Components
import ProfileTemplate from '../profile/ProfileTemplate';
import CreateAdPage1 from '../ads/CreateAdPage1'
import Vehicle from './Vehicle'
import RealEstate from './RealEstate'


class CreateAd extends Component {
	constructor() {
		super();
		this.state = {
			isActive: true,
			vehiclesIsActive: false,
			realStateIsActive: false,
      title: '',
      description: '',
      category: 'none',
			price: '',
			nextIsVisible: false, 
			prevIsVisible: false, 
			submitIsVisible: false,  
			make: '',
			year: '',
			odometer: '',
			model: '',
			type: '',
			transmision: '',
			propertyType: '',
			transaction: '',
			rooms: '',
			bathrooms: '',
			errors: {}
		};
	}

	
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			this.validateInput()
		})
	}

	vehicleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	realEstateOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	validateInput = () => {

		const { title, description, category, price } = this.state;

		if(
			title.length > 5 &&
			description.length > 5 &&
			price !== '' &&
			category !== 'none'
		) {

			if(category === 'vehicles' || category === 'real_estate') {

				this.setState({
					nextIsVisible: true,
					submitIsVisible: false
				})

			} else {

				this.setState({
					nextIsVisible: false, 
					submitIsVisible: true
				})

			}

		} else { 
			this.setState({
				nextIsVisible: false, 
				submitIsVisible: false
			})
		}

	}

	onNextClick = () => {
		switch (this.state.category) {
			case 'vehicles':
				this.setState({
					isActive: false, 
					realStateIsActive: false,
					nextIsVisible: false,
					vehiclesIsActive: true,
					prevIsVisible: true, 
					submitIsVisible: true
				})
				break;

			case 'real_estate':
				this.setState({
					isActive: false, 
					vehiclesIsActive: false,
					nextIsVisible: false, 
					realStateIsActive: true,
					prevIsVisible:true,
					submitIsVisible: true
				})
				break;

			default:
				break;
		}
	}

	onPrevClick = () => {
		this.setState({
			vehiclesIsActive: false,
			realStateIsActive: false,
			submitIsVisible: false,
			prevIsVisible: false,
			isActive: true,
			nextIsVisible: true
		})
	}

	render() {
		const { 
				isActive, 
				title, 
				description, 
				category, 
				price,  
				submitIsVisible,
				nextIsVisible,
				realStateIsActive,
				vehiclesIsActive,
				prevIsVisible,
				make,
				year,
				odometer,
				model,
				type,
				transmision,
				propertyType,
				transaction,
				rooms,
				bathrooms,
				errors 
		} = this.state;

		return (
			<ProfileTemplate>
				<Helment>
					<title>Create Ad</title>
				</Helment>
				<div className="create-ad">
					<div className="row">
						<div className="col-md-10 col-12 m-auto">
							<h3 className="mt-3 text-center display-4">Create Ad</h3>
							<hr />
							<small className="mb-3">* Required Fields </small>
							<form className="custom-form create-ad-form mx-auto mt-3 p-4">
              <CreateAdPage1 
                isActive={isActive}
                title={title}
                description={description}
                category={category}
								change={this.onChange}
                errors={errors}
								price={price}
              />

							<Vehicle 
								isActive={vehiclesIsActive}
								make={make}
								year={year}
								odometer={odometer}
								model={model}
								type={type}
								transmision={transmision}
								change={this.vehicleOnChange}
								errors={errors}
							/>

							<RealEstate 
								isActive={realStateIsActive}
								propertyType={propertyType}
								transaction={transaction}
								rooms={rooms}
								bathrooms={bathrooms}
								change={this.realEstateOnChange}
								errors={errors}
							/>


								<div className="pagination d-flex justify-content-between">
									<div>
										<button onClick={this.onPrevClick} type="button" className={!prevIsVisible ? "input-hide" : "btn btn-primary"}>
											Prev
										</button>
									</div>

									<div>
										<button onClick={this.onNextClick} type="button" className={!nextIsVisible ? 'input-hide' :"btn btn-primary"}>
											Next
										</button>
										<button type="submit" className={!submitIsVisible ? "input-hide" : "btn btn-primary"}>
											Create Ad
										</button>
									</div>
								</div>

							</form>
						</div>
					</div>
				</div>
			</ProfileTemplate>
		);
	}
}

export default CreateAd;
