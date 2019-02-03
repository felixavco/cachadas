import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/isEmpty';
import Helmet from 'react-helmet';

//Router
import { Link, withRouter } from 'react-router-dom';

//Redux 
import { connect } from 'react-redux';
import { getSinglePost, editPost } from '../../../redux/actions/postsActions';

//Components 
import Spinner from '../../commons/Spinner';
import NotFound from '../../commons/NotFound';
import EditInfo from './EditInfo'
import EditRE from './EditRE'
import EditVehicles from './EditVehicles'

class EditAd extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      postId: props.match.params.postId,
      isLoading: true,
      pageTitle: '',
      _id: '',
      title:'', 
      price:'', 
      category:'', 
      description:'', 
      contactEmail:'',
      contactPhone:'',
      images: {},
      make:'', 
      transmision: '',
      model:'', 
      year:'', 
      gas:'', 
      type:'', 
      propertyType:'', 
      transaction:'',
      rooms:'', 
      bathrooms:'',
      owner: '',
      errors: {}
    }
  }

  componentDidMount() {
    const { postId } = this.state;
    this.props.getSinglePost({postId});
  }
  
  componentWillReceiveProps = nextProps => {
		if (nextProps.singlePost) {
      const { id } = this.props.auth.user
      const { owner } = nextProps.singlePost

      if(id !== owner) {
        return this.props.history.push('/not-found');
      }

      this.setState({
        _id: nextProps.singlePost._id,
        title: nextProps.singlePost.title,
        price: nextProps.singlePost.price,
        category: nextProps.singlePost.category,
        description: nextProps.singlePost.description,
        contactEmail: nextProps.singlePost.contactEmail,
        contactPhone: nextProps.singlePost.contactPhone,
        images: nextProps.singlePost.images,
        owner: nextProps.singlePost.owner,
        pageTitle: nextProps.singlePost.title,
        isLoading: false
      })

      switch (nextProps.singlePost.category) {

        case "vehicles":
          this.setState({
            make: nextProps.singlePost.make,
            model: nextProps.singlePost.model,
            transmision: nextProps.singlePost.transmision,
            year: nextProps.singlePost.year,
            gas: nextProps.singlePost.gas,
            type: nextProps.singlePost.type
          })
          
        break;
        
        case "real_estate":
          this.setState({
            propertyType: nextProps.singlePost.propertyType,
            transaction: nextProps.singlePost.transaction,
            rooms: nextProps.singlePost.rooms,
            bathrooms: nextProps.singlePost.bathrooms,
          })
        break;
      }
		}

		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
				isLoading: false
			})
    }
    

  }
  
  onChange = e => this.setState({ [e.target.name]: e.target.value })

  imagesOnChange = e => {
    this.setState({
			images: e.target.files
		})
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      images,
      title, 
      price, 
      category, 
      description, 
      contactEmail,
      contactPhone,
      make, 
      model, 
      year, 
      gas, 
      type,
      transmision, 
      propertyType, 
      transaction,
      rooms, 
      bathrooms, 
      owner,
      postId
    } = this.state;

    const $price = price.toString()

    const formData = new FormData()
		formData.append('postId', postId)
		formData.append('owner', owner)
		formData.append('contactEmail', contactEmail)
		formData.append('contactPhone', contactPhone)
		formData.append('title', title)
		formData.append('description', description)
		formData.append('category', category)
		formData.append('price', $price)
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
				this.props.editPost(formData, this.props.history);
			break;
			
			case "real_estate":
				formData.append('propertyType', propertyType)
				formData.append('transaction', transaction)
				formData.append('rooms', rooms)
				formData.append('bathrooms', bathrooms)
				this.props.editPost(formData, this.props.history);
			break;
		
			default:
        this.props.editPost(formData, this.props.history);
			break;
    }
    
  }

  
  render() {

    let content = null;
    
    let block = null;

		if(!isEmpty(this.state.errors.error)) {

			content = <NotFound/>

		} else if(isEmpty(this.state._id) ) {

			content = (
				<div className="my-5">
					<h3 className="text-center display-4">Loading....</h3>
					<Spinner/>
				</div>
			)
			 
		} else {

			const { 
				title, 
				price, 
				category, 
				description, 
				contactEmail,
				contactPhone,
				make, 
				model, 
				year, 
				gas, 
        type,
        transmision, 
				propertyType, 
				transaction,
				rooms, 
				bathrooms, 
        errors,
        pageTitle
      } = this.state;

      switch (category) {
        case "vehicles":
          block = (
            <EditVehicles 
              make={make}
              model={model}
              year={year}
              gas={gas}
              transmision={transmision}
              type={type}
              onchange={this.onChange}
              errors={errors}
            />
          )
        break;

        case "real_estate":
          block = (
              <EditRE
                propertyType={propertyType}
                transaction={transaction}
                rooms={rooms}
                bathrooms={bathrooms}
                onchange={this.onChange}
                errors={errors}
              />
            )
        break;
      }

     content = (
      <form className="edit-ad-form p-4 my-3 custom-form" onSubmit={this.onSubmit}>
        <div className="d-flex justify-content-between mb-2">
          <button 
            onClick={() => this.fileInput.click()}
            className="btn btn-primary" 
            type="button"
          >
            Change Images &nbsp; 
            <i className="far fa-images"/>
          </button>

          <button 
            className="btn btn-primary" 
            type="submit"
          >
            SAVE &nbsp; 
            <i className="far fa-save"/>
          </button>
        </div>

        <input 
          ref={fileInput => this.fileInput = fileInput} 
          className="d-none" 
          onChange={this.imagesOnChange} 
          type="file" 
          name="images" 
          multiple accept="image/jpg, image/jpeg, image/png"
        />

        <h2 className="text-center display-4">Edit {pageTitle}</h2>
        <EditInfo
          title={title}
          price={price}
          category={category}
          description={description}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          onchange={this.onChange}
          errors={errors}
        />

        { block }

        <div className="w-50 mx-auto mb-2">
          <button className="btn btn-primary btn-block" type="submit">SAVE &nbsp; <i className="far fa-save"/></button>
        </div>
      </form>

     )

    }

    return (
      <Fragment>

        <Helmet>
          <title>{this.state.pageTitle}</title>
        </Helmet>

        <div className="edit-post">
        <div className="mt-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/my-ads">My Ads</Link></li>
                <li className="breadcrumb-item"><Link to={`/post/${this.state._id}?origin=my-ads`}>{this.state.pageTitle.substring(0, 10) + '...'}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
              </ol>
            </nav>
          </div>
          { content }
        </div>
      </Fragment>
    )
  }
}

EditAd.propTypes = {
	auth: PropTypes.object.isRequired,
	singlePost: PropTypes.object.isRequired,
  getSinglePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
  singlePost: state.posts.singlePost,
  errors: state.errors
})

export default connect(mapStateToProps, { getSinglePost, editPost })(withRouter(EditAd));