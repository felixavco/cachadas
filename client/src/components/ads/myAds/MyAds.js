import React, { Component } from 'react';
import ProfileTemplate from '../../profile/ProfileTemplate';
import PropTypes from 'prop-types'
import emptyImage  from  '../../../img/empty-image.png';
import Helment from 'react-helmet';

//Components
import Spinner from '../../commons/Spinner';
import AdCard from './AdCard';

//Router
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { loadMyPosts, deletePost } from '../../../redux/actions/postsActions'

class MyAds extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: true,
			myPosts: []
		};
	}

	componentDidMount() {
		this.props.loadMyPosts();
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.myPosts) {
			this.setState({ 
				myPosts: nextProps.myPosts,
				isLoading: false
			});
		}
	}
	
	onDelete = id => {

		const { myPosts } = this.state;

		const data = {postId: id}

		const newMyPosts = myPosts.filter(post => post._id !== id);

		this.setState({myPosts: newMyPosts});

		this.props.deletePost(data, newMyPosts);
	}

	render() {

		let content;
		const { isLoading, myPosts } = this.state;

		if (isLoading) {
			content = <Spinner />;
		} else {
			if (myPosts.length < 1) {
				content = (
					<div className="mt-5">
						<h3 className="text-center">You have not posted an Ad yet!</h3>;
						<p className="lead text-center">Click <Link to="/create-ad">HERE</Link> to create your first ad</p>
					</div>
				)
			} else {

				const myAds = myPosts.reverse().map(post => (
					<AdCard 
						key={post._id}
						img={post.images[0] || emptyImage}
						description={post.description}
						title={post.title}
						id={post._id}
						onDelete={this.onDelete}
					/>
				))
				content = (
					<div className="grid">
						{myAds}
					</div>
				);
			}
		}

		return (
			<ProfileTemplate>
				<Helment>
					<title>My Ads</title>
				</Helment>
				<div className="my-ads">
					<h1 className="display-4 text-center">My Ads</h1>
					<hr />
					{content}
				</div>
			</ProfileTemplate>
		);
	}
}

MyAds.propTypes = {
	auth: PropTypes.object.isRequired,
	myPosts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	myPosts: state.posts.myPosts
});

export default connect(mapStateToProps, { loadMyPosts, deletePost })(MyAds);






