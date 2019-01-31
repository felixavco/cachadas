import React, { Component } from 'react';
import Helment from 'react-helmet';
import PropTypes from 'prop-types';


//Router 
import { withRouter } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import { createPost } from '../../../redux/actions/postsActions'

//Components
import ProfileTemplate from '../../profile/ProfileTemplate';
import CreateAdPage1 from './CreateAdPage1'
import Vehicle from './Vehicle'
import RealEstate from './RealEstate'


class CreateAd extends Component {
	constructor(props) {
		super(props);

		const { public_email, phone } = this.props.auth.user

		this.state = {
			contactPhone: phone,
			contactEmail: public_email,
			isActive: true,
			vehiclesIsActive: false,
			realStateIsActive: false,
			nextIsVisible: false, 
			prevIsVisible: false, 
			submitIsActive: false,
			submitIsVisible: false,  
      title: '',
      description: '',
      category: 'none',
			price: '',
			make: '',
			year: '',
			gas: 'Gasoline',
			model: '',
			type: '',
			transmision: '',
			propertyType: '',
			transaction: 'Sell',
			rooms: '',
			bathrooms: '',
			images: {},
			errors: {}
		};
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value }, () => this.validateInput())
	}

	imagesOnChange = e => {
		this.setState({
			images: e.target.files
		})
	}

	vehicleOnChange = e => {
		this.setState({[e.target.name]: e.target.value}, () => this.vehicleInputValidation())
	}

	vehicleInputValidation = () => {
		const { make, year, model, type, transmision, gas } = this.state
		if(
			make !== '' && 
			year !== '' &&
			model !== '' &&
			type !== '' &&
			transmision !== '' &&
			gas !== ''
		) {
			this.setState({submitIsActive: true})
		} else {
			this.setState({submitIsActive: false})
		}
	}

	realEstateOnChange = e => {
		this.setState({ [e.target.name]: e.target.value }, () => this.realEstateInputValidation())
	}

	realEstateInputValidation = () => {

		const { propertyType, transaction, rooms, bathrooms } = this.state

		if(
			propertyType !== '' &&
			transaction !== '' &&
			rooms !== '' &&
			bathrooms !== ''
		) {
			this.setState({submitIsActive: true})
		} else {
			this.setState({submitIsActive: false})
		}
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
					submitIsVisible: false,
					submitIsActive: false
				})

			} else {

				this.setState({
					nextIsVisible: false, 
					submitIsVisible: true,
					submitIsActive: true
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

	onSubmit = e => {
		e.preventDefault()
		
		const { 
			contactEmail, 
			contactPhone,
			title,
			description,
			category,
			price,
			make,
			year, 
			gas, 
			model, 
			type,
			transmision, 
			propertyType,
			transaction,
			rooms,
			bathrooms,
			images
		} = this.state

		const formData = new FormData()
		formData.append('contactEmail', contactEmail)
		formData.append('contactPhone', contactPhone)
		formData.append('title', title)
		formData.append('description', description)
		formData.append('category', category)
		formData.append('price', price)
		for(let i = 0; i < images.length; i++){
			formData.append('images', images[i])
		}
		
		switch (category) {
			case "vehicles":
			
				formData.append('make', make)
				formData.append('year', year)
				formData.append('gas', gas)
				formData.append('model', model)
				formData.append('type', type)
				formData.append('transmision', transmision)
				this.props.createPost(formData, this.props.history)
				break;
			
			case "real_estate":

				formData.append('propertyType', propertyType)
				formData.append('transaction', transaction)
				formData.append('rooms', rooms)
				formData.append('bathrooms', bathrooms)
				this.props.createPost(formData, this.props.history)
				break;
		
			default:
			
				this.props.createPost(formData, this.props.history)
				break;
		}

	}

	render() {
		const { 
				isActive, 
				title, 
				description, 
				category, 
				price,  
				submitIsActive,
				submitIsVisible,
				nextIsVisible,
				realStateIsActive,
				vehiclesIsActive,
				prevIsVisible,
				make,
				year,
				gas,
				model,
				type,
				transmision,
				propertyType,
				transaction,
				rooms,
				bathrooms,
				contactPhone,
				contactEmail,
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
							<form 
								onSubmit={this.onSubmit} 
								className="custom-form create-ad-form mx-auto mt-3 p-4"
							>

              <CreateAdPage1 
                isActive={isActive}
                title={title}
                description={description}
                category={category}
								change={this.onChange}
                errors={errors}
								price={price}
								contactPhone={contactPhone}
								contactEmail={contactEmail}
              />

							<Vehicle 
								isActive={vehiclesIsActive}
								make={make}
								year={year}
								gas={gas}
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

							<div className={!isActive ? 'input-hide' : null}>
								<button 
									onClick={() => this.fileInput.click()}
									className="btn btn-primary" 
									type="button"
								>
									Add Images &nbsp; 
									<i className="far fa-images"/>
								</button>

								<input 
									className="d-none"
								 ref={fileInput => this.fileInput = fileInput} 
									onChange={this.imagesOnChange} 
									type="file" 
									name="images" 
									id="images" 
									multiple accept="image/jpg, image/jpeg, image/png"
								/>
							</div>

								<div className="pagination d-flex justify-content-between">
									<div>
										<button onClick={this.onPrevClick} type="button" className={!prevIsVisible ? "input-hide" : "btn btn-primary"}>
											Prev
										</button>
									</div>

									<div>
										<button 
											onClick={this.onNextClick} 
											type="button" className={!nextIsVisible ? 'input-hide' :"btn btn-primary"}
										>
											Next
										</button>
										<button 
											type="submit" 	
											className={!submitIsVisible ? "input-hide" : "btn btn-primary"} 
											disabled={!submitIsActive ? 'disabled' : null}
										>
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

CreateAd.proptypes = {
	createPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { createPost })(withRouter(CreateAd));
