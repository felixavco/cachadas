import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/isEmpty'

//Components
import AdInfo from './AdInfo';
import AdGallery from './AdGallery';
import Spinner from '../../commons/Spinner';
import NotFound from '../../commons/NotFound';

//Router 
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { getSinglePost } from '../../../redux/actions/postsActions';

class SingleAd extends Component {
	constructor(props) {
		super(props);

		const qs = queryString.parse(props.location.search);

		this.state = {
			postId: props.match.params.postId,
			origin: qs.origin,
			isLoading: true,
			singlePost: {},
			errors: {}
		};
	}

	componentDidMount() {
		const { postId } = this.state;
		this.props.getSinglePost({postId});
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.singlePost) {
			this.setState({ 
				singlePost: nextProps.singlePost,
				isLoading: false
			});
		}

		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
				isLoading: false
			})
		}
	}

	render() {

		let content;

		let navigation;

		if(!isEmpty(this.state.errors.error)) {

			content = <NotFound/>

		} else if(isEmpty(this.state.singlePost) ) {

			content = (
				<div className="my-5">
					<h3 className="text-center display-4">Loading....</h3>
					<Spinner/>
				</div>
			)
			 
		} else {

			const { 
				_id,
				owner,	
				title, 
				price, 
				category, 
				description, 
				contactEmail,
				contactPhone,
				images,
				make, 
				model, 
				year, 
				gas, 
				type, 
				propertyType, 
				transaction,
				rooms, 
				bathrooms, 
				owner_info
			} = this.state.singlePost

			const { id } = this.props.auth.user;

			content = (
			<Fragment>
				{owner === id ? (<Link to={`/post/edit/${_id}`} className="mt-3 btn btn-primary">Edit  <i className="fas fa-pencil-alt" /></Link>) : null}
				<div className="row mb-2">
					<div className="col-md-9 col-12">
						<h2 className="display-4">{title}</h2>
					</div>
					<div className="col-md-3 col-12 d-flex align-items-center">
						<h4><span className="alert alert-success">${price}</span></h4>
					</div>
				</div>

				<div className="row mb-4">			
					<div className="col-md-7 col-12 gallery-cont">
						<AdGallery 
							images={images}
						/>
					</div>
					<div className="col-md-5 col-12">
						<AdInfo
							owner={owner_info}
							category={category}
							description={description}
							contactEmail={contactEmail}
							contactPhone={contactPhone}
							make={make}
							model={model}
							year={year}
							gas={gas}
							type={type}
							propertyType={propertyType}
							transaction={transaction}
							rooms={rooms}
							bathrooms={bathrooms}
						/>
					</div>
				</div>
			</Fragment>
			)
		}

		const { origin } = this.state;

		if(origin === 'my-ads') {
			navigation = (<li className="breadcrumb-item"><Link to="/my-ads">My Ads</Link></li>)
		}

		return (
			<Fragment>
				<div className="mt-1">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							{ navigation }
							<li className="breadcrumb-item active" aria-current="page">{this.state.singlePost.title}</li>
						</ol>
					</nav>
				</div>
				{ content }
			</Fragment>
		);
	}
}

SingleAd.propTypes = {
	auth: PropTypes.object.isRequired,
	singlePost: PropTypes.object.isRequired,
	getSinglePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	singlePost: state.posts.singlePost,
	errors: state.errors
})

export default connect(mapStateToProps, { getSinglePost })(SingleAd);
