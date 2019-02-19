import React from 'react';
import Helment from 'react-helmet';

const About = () => {
	return (
		<div>
			<Helment>
        <title>About Us</title>
			</Helment>

      <h2 className="text-center display-4 my-3">About Us</h2>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="lead">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil totam soluta facilis laudantium iure illo neque. Impedit atque minus ducimus quam animi? Aliquam eligendi et illum ipsa delectus fugiat harum.Placeat blanditiis alias doloremque ipsa fuga, odio, beatae quae explicabo eum repellat nemo in, deleniti cumque quam velit aperiam ullam voluptas suscipit pariatur quas tempore cum atque consequuntur nihil. Vero!
              </p>
            </div> 
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 col-12">
              <h5 className="text-center">Our Mission</h5>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nobis. Nostrum obcaecati magnam doloremque in possimus libero. Voluptatibus voluptate quaerat rem molestias. Commodi alias similique laborum, ex corrupti inventore eius.
              </p>
            </div>
            <div className="col-lg-6 col-12">
              <h5 className="text-center">Our Vision</h5>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, dolor quia repellat facere numquam quisquam cupiditate quis ipsam praesentium. Nulla eum quam perspiciatis natus blanditiis voluptate quis ipsam tenetur accusantium!
              </p>
            </div>
          </div>

        </div>
		</div>
	);
};

export default About;
