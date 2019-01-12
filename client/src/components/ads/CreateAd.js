import React, { Component } from 'react';
import Helment from 'react-helmet';

//Components
import ProfileTemplate from '../profile/ProfileTemplate';
import CreateAdPage1 from '../ads/CreateAdPage1'

class CreateAd extends Component {
	constructor() {
		super();
		this.state = {
      page1isActive: true,
      title: '',
      description: '',
      category: '',
      price: 0,
			errors: {}
		};
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { page1isActive, title, description, category, price, errors } = this.state;

		return (
			<ProfileTemplate>
				<Helment>
					<title>Create Ad</title>
				</Helment>
				<div className="create-ad">
					<div className="row">
						<div className="col-md-10 col-12 m-auto">
							<h3 className="mt-3 text-center display-4">Create new Ad</h3>
							<hr />
							<form className="custom-form create-ad-form mx-auto mt-3 p-4">
								
              <CreateAdPage1 
                isActive={page1isActive}
                title={title}
                description={description}
                category={category}
                change={this.onChange}
                errors={errors}
                price={price}
              />

							</form>
						</div>
					</div>
				</div>
			</ProfileTemplate>
		);
	}
}

export default CreateAd;
