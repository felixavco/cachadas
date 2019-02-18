import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import SingleAdCard from './SingleAdCard';
import Pagination from './Pagination';
import Spinner from '../commons/Spinner';
import PropTypes from 'prop-types';
import emptyImage from '../../img/empty-image.png';
import queryString from 'query-string';

//Redux
import { connect } from 'react-redux';
import { loadAllPosts } from '../../redux/actions/postsActions';
import SearchBar from './SearchBar';

class Landing extends Component {
	constructor(props) {
		super(props);

		const qs = queryString.parse(props.location.search);

		this.state = {
			pages: 0,
			perPage: 6,
			posts: [],
			errors: {},
			isLoading: true,
			currentPage: qs.page || 1,
			search: 'none',
			category: 'none'
		};
	}

	componentDidMount() {
		const { currentPage, search, category } = this.state;
		this.props.loadAllPosts(currentPage, search, category);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.postsPerPage) {
			this.setState({
				posts: nextProps.postsPerPage,
				isLoading: false
			});
		}

		if (nextProps.total_items) {
			this.numOfPages(nextProps.total_items);
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
				isLoading: false
			});
		}
	}

	setQuery = (query) => {
		this.setState({
			search: query.search,
			category: query.category
		});
	};

	onSearch = () => {
		const { currentPage, search, category } = this.state;
		this.props.loadAllPosts(currentPage, search, category);
	};

	numOfPages = (items) => {
		const { perPage } = this.state;

		if (items > 6) {
			console.log(items);
			if (items % perPage === 0) {
				this.setState({ pages: items / perPage });
			} else {
				const x = Math.trunc(items / perPage);
				this.setState({ pages: x + 1 });
			}
		} else {
			this.setState({ pages: 1 });
		}
	};

	nextPage = () => {
		this.setState({ currentPage: this.state.currentPage + 1 }, () => {
			const { currentPage, search, category } = this.state;
			this.props.loadAllPosts(currentPage, search, category);
		});

		if (this.state.currentPage >= this.state.pages) {
			this.setState({ currentPage: this.state.pages });
		}
	};

	prevPage = () => {
		this.setState({ currentPage: this.state.currentPage - 1 }, () => {
			const { currentPage, search, category } = this.state;
			this.props.loadAllPosts(currentPage, search, category);
		});

		if (this.state.currentPage <= 1) {
			this.setState({ currentPage: 1 });
		}
	};

	setPage = (page) => {
		this.setState({ currentPage: page }, () => {
			const { currentPage, search, category } = this.state;
			this.props.loadAllPosts(currentPage, search, category);
		});
	};

	render() {
		const { posts, isLoading, currentPage, pages } = this.state;

		let content;

		let POSTS = posts.map((post) => (
			<SingleAdCard
				key={post._id}
				id={post._id}
				title={post.title}
				image={post.images[0] || emptyImage}
				price={post.price}
			/>
		));

		if (isLoading) {
			content = (
				<div className="my-5">
					<h3 className="text-center display-4">Loading....</h3>
					<Spinner />
				</div>
			);
		} else {
			content = <div className="my-4 main-grid">{POSTS}</div>;
		}

		if (currentPage > pages || currentPage < 1) {
			content = (
				<div className="my-5">
					<h3 className="text-center display-4">Loading....</h3>
					<Spinner />
				</div>
			);
		}

		return (
			<Fragment>
				<Helmet>
					<title>Cachadas.com</title>
				</Helmet>

				<SearchBar currentPage={currentPage} onSearch={this.onSearch} setQuery={this.setQuery} />

				<div className={`pagination-top mt-2 ${isLoading ? 'd-none' : 'd-flex justify-content-center'}`}>
					<Pagination
						pages={pages}
						currentPage={currentPage}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						setPage={this.setPage}
					/>
				</div>

				{content}

				<div className={`pagination-bottom ${isLoading ? 'd-none' : 'd-flex justify-content-center'}`}>
					<Pagination
						pages={pages}
						currentPage={currentPage}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						setPage={this.setPage}
					/>
				</div>
			</Fragment>
		);
	}
}

Landing.proptypes = {
	loadAllPosts: PropTypes.func.isRequired,
	postsPerPage: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	postsPerPage: state.posts.PostsPerPage,
	total_items: state.posts.total_items,
	errors: state.errors
});

export default connect(mapStateToProps, { loadAllPosts })(Landing);
