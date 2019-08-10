import React, { Component } from 'react';
//import defaultImage from "../assets/images.png";
import { Redirect } from 'react-router';
import { timingSafeEqual } from 'crypto';

class AddItem extends Component {

  state = {
    name: null,
    description: null,
    image: null,
    price: null,
    stock: null,
    redirect: false
  }

  getInputValues = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  }

  createItem = (e) => {
    e.preventDefault();
    const item = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
      stock: this.state.stock
    }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)

    }

    if (this.state.description && this.state.image && this.state.name && this.state.price && this.state.stock) {
      fetch("/items", options)
        //fetch("http://localhost:3000/items", options)
        .then(res => {
          console.log(res);
          this.setState({ redirect: true });
        })
    } else {
      console.log("The form is not valid to be sent")
    }

  }


  render() {
    const isImgReady = this.state.image;
    let imagePreview;

    if (isImgReady) {
      imagePreview = <img src={this.state.image} alt="product " />
    } else {
      imagePreview = <img src="https://i.imgur.com/bzGhwT8.png" alt="default preview" />
    }

    const isAvailStock = parseInt(this.state.stock);
    let availStock;
    if (isAvailStock > 0) {
      availStock = isAvailStock;
    } else {
      availStock = "Out of Stock";
    }

    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/main" />
    }
    return (
      <React.Fragment>

        <section >
          <h2 className="fragmentTitle">Add a New Item</h2>

          <div className="itemCreation">
            <form onSubmit={this.createItem}>
           
              <div className="form-group cardForm">
                <label htmlFor="name">Product Name: </label>
                <input type="text" 
                className="form-control"
                id="productName"
                aria-describedby="productName"
                placeholder="Product Name"
                name="name" 
                onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description: </label>
                <textarea name="description" 
                className="form-control"
                id="productDesctiption"
                placeholder="Add a Product Description"
                onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="price">Product Price: </label>
                <input type="text"
                className="form-control" 
                id="productPrice"
                placeholder="0.00"
                name="price" onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Available Stock: </label>
                <input type="number" 
                name="stock" 
                className="form-control"
                id="productStock"
                placeholder="Add a quantity"
                onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="image">Product Image: </label>
                <input type="text" 
                name="image" 
                className="form-control"
                id="productImage"
                placeholder="Image URL"
                onChange={this.getInputValues} />
              </div>

              <button className="btn btn-outline-success btn" type="submit">Add new Product</button>
            </form>

            <div className="preview card">

              <div className="card-img-top">
                {imagePreview}
              </div>
              <div className="card-body">
                <div className="card-title cardTitle">
                  <h4>{this.state.name}</h4>
                </div>
                <div className="card-text">
                <div className="cardSpace">
                  <p><strong> Description:<br /></strong> {this.state.description} </p>
                  <p><strong> Price:<br /></strong> $ {this.state.price}</p>
                  <p><strong> Available Stock:<br /></strong> {availStock}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>


      </React.Fragment>
    );
  }
}

export default AddItem;