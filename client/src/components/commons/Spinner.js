import React from 'react';

const Spinner = () => {

	const styles = {
		width: '75px',
		height: '75px'
	}

	return (
		<div className="mx-auto mt-5 text-center">
			<div style={styles} className="spinner-border text-primary" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
