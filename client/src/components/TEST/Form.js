import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = { images: {} };
  }

  onChangeImages = e => {
    this.setState({ images: e.target.files })
  };

  onSubmit = e => {
    e.preventDefault();

    const { images } = this.state;

    const formData = new FormData();

    formData.append("images", images);

    axios
      .post("/api/post/create", formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <input
          onChange={this.onChangeImages}
          type="file"
          name="images"
          multiple
          accept="image/png, image/jpeg, image/jpg"
        />

        <br />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default Form;
