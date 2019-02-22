import React, { Component } from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';
import { categories } from '../ads/List_Items/ListsItems';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			category: 'none'
		};
	}

	onChange = (e) =>
		this.setState({ [e.target.name]: e.target.value }, () => {
			const { search, category } = this.state;
			const query = { search, category };
			this.props.setQuery(query);
		});

	render() {
		const { search, category } = this.state;
		const currentPage = this.props.currentPage || 1;
		const { onSearch } = this.props;

		return (
			<form className="custom-form">
				<div className="row mt-3">
					<div className="col-lg-7 col-12">
						<TextFieldGroup
							placeholder="What are you looking for?"
							name="search"
							value={search}
							onChange={this.onChange}
						/>
					</div>

					<div className="col-lg-3 col-12">
						<SelectListGroup
							name="category"
							value={category}
							onChange={this.onChange}
							options={categories}
						/>
					</div>

					<div className="col-lg-2 col-12">
						<Link onClick={onSearch} className="btn btn-primary btn-block" to={`/?page=${currentPage}`}>
							SEARCH &nbsp; <i className="fas fa-search" />
						</Link>
					</div>
				</div>
			</form>
		);
	}
}

export default SearchBar;
