import React from 'react';

import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, nextPage, prevPage, setPage, pages }) => {
	let PAGES = [];

	for (let i = 0; i < pages; i++) {
		PAGES = [
			...PAGES,
			<li onClick={() => setPage(i + 1)} key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
				<Link className="page-link" to={`/?page=${i + 1}`}>
					{i + 1}
				</Link>
			</li>
		];
	}

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination pagination">
				<li onClick={prevPage} className={`page-item ${currentPage === 1 ? 'disabled btn-off' : null}`}>
					<Link className="page-link" to={`/?page=${currentPage - 1}`}>
						Previous
					</Link>
				</li>
				{PAGES}
				<li onClick={nextPage} className={`page-item ${currentPage >= pages ? 'disabled btn-off' : null}`}>
					<Link className="page-link" to={`/?page=${currentPage + 1}`}>
						Next
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
