import React, { Component, Fragment } from 'react';

//Router
import { Link } from 'react-router-dom';

class AdCard extends Component {
	constructor(props) {
		super(props);

		this.state = { id: '' };
	}

	onDeleteConfirmation = confirmation => {
		if(confirmation) {
			this.props.onDelete(this.state.id)
			this.setState({id: ''})
		} else {
			this.setState({id: ''})
		}
	};

	render() {
		let { img, description, title, id } = this.props;

		// if (title.length >= 25) {
			title = title.substring(0, 25) + '...';
		// }

		// if (description.length >= 100) {
			description = description.substring(0, 100) + '...';
		// }


		return (
			<Fragment>
				<div className="adCard">
					<Link to={`/post/${id}?origin=my-ads`}>
						<div className="img-cont">
							<img src={img} alt={title} />
						</div>
						<h5 className="my-2 text-center">{title}</h5>
					</Link>
					<p className="px-3 description">{description}</p>
					<div className="actions-cont mx-auto d-flex justify-content-end">
						<Link className="action edit mr-2" to={`/post/edit/${id}`}>
							Edit &nbsp;
							<i className="fas fa-pencil-alt" />
						</Link>
						<span
							style={{cursor: 'pointer'}}
							className="action delete mr-3"
							href="#"
							onClick={() => this.setState({id})}
							data-toggle="modal"
							data-target="#deletePostModal"
						>
							Delete &nbsp;
							<i className="fas fa-trash-alt" />
						</span>
					</div>
				</div>

				{/* Modal delete confirmation */}
				<div
					className="modal fade"
					id="deletePostModal"
					tabndex="-1"
					role="dialog"
					aria-labelledby="deletePostModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="deletePostModalLabel">
									Delete Post
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">Are you sure? this acction cannot be undone.</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.onDeleteConfirmation(false)}>
									Cancel
								</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.onDeleteConfirmation(true)}
								>
									DELETE
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default AdCard;


