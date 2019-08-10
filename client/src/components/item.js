import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Item extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    redirect: false
  }

  componentDidMount = () => {
    fetch("/item/" + this.props.match.params.id).then(res => {
      //fetch("http://localhost:3000/item/" + this.props.match.params.id).then(res => {
      return res.json();
    }).then(blob => {

      this.setState({ name: blob.item.name });
      this.setState({ description: blob.item.description });
      this.setState({ image: blob.item.image });
      this.setState({ price: blob.item.price });
      this.setState({ stock: blob.item.stock })

    });
  }

  getInputValues = (e) => {

    this.setState({ [e.target.name]: e.target.value })
  }

  updateItem = (e) => {
    e.preventDefault();
    //update the item
    const item = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
      stock: this.state.stock
    }
    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)

    }
    fetch("/item/" + this.props.match.params.id, options)
      //fetch("http://localhost:3000/item/"+ this.props.match.params.id, options)
      .then(res => {
        console.log(res);
//        this.setState({ redirect: true });
      }).catch(err => {
        console.log(err);
      })
  }

  deleteItem = () => {
    let confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const options = {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: this.props.match.params.id })

      }
      fetch("/item/" + this.props.match.params.id, options)
        //fetch("http://localhost:3000/item/"+ this.props.match.params.id, options)
        .then(res => {
          console.log(res);
          this.setState({ redirect: true });
        })
    } else {
      console.log("Item was not deleted")
    }

  }

  render() {

    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/main" />
    }

    return (
      <React.Fragment>
        <section >
          <h2 className="fragmentTitle">Update an item</h2>

          <div className="itemCreation">
          <form onSubmit={this.updateItem}>
           <div className="form-group cardForm">
            <label htmlFor="name">Product Name: </label>
            <input type="text"className="form-control" name="name" onChange={this.getInputValues} defaultValue={this.state.name} />
            </div>

            <div className="form-group">
            <label htmlFor="description">Product Description: </label>
            <textarea name="description" className="form-control" onChange={this.getInputValues} value={this.state.description} >
            </textarea>
            </div>

            <div className="form-group">
            <label htmlFor="price">Product Price: </label>
            <input type="text" className="form-control" name="price" onChange={this.getInputValues} defaultValue={this.state.price} />
            </div>

            <div className="form-group">
            <label htmlFor="stock">Available Stock: </label>
            <input type="text" className="form-control" name="stock" onChange={this.getInputValues} defaultValue={this.state.stock} />
            </div>
            
            <div className="form-group">
            <label htmlFor="image">Product Image: </label>
            <input type="text" className="form-control" name="image" onChange={this.getInputValues} defaultValue={this.state.image} />
            </div>
            
            <button className="btn btn-outline-success btn" type="submit">Update Item</button>
         </form>

            <div className="preview card">

              <div className="card-img-top">
                <img src={this.state.image} alt="product" />
              </div>
              <div className="card-body">
                <div className="card-title">
                  <h4>{this.state.name}</h4>
                </div>
                <div className="card-text">
                  <div className="cardSpace">
                    <p><strong> Description:<br /></strong> {this.state.description} </p>
                    <p><strong> Price:<br /></strong> $ {this.state.price}</p>
                    <p><strong> Available Stock:<br /></strong> {this.state.stock}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-danger delete" onClick={this.deleteItem}>Delete this Item</button>
                </div>
              </div>
            </div>

          </div>

        </section>

      </React.Fragment>
    );
  }
}

export default Item;


/*
<form onSubmit={this.updateItem}>
              <div className="form-group cardForm">
                <label htmlFor="name">Product Name: </label>
                <input type="text"
                  className="form-control"
                  id="productName"
                  aria-describedby="productName"
                  defaultValue={this.state.name}
                  onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description: </label>
                <textarea name="description"
                  className="form-control"
                  id="productDesctiption"
                  value={this.state.description}
                  onChange={this.getInputValues} >
                </textarea>
              </div>

              <div className="form-group">
                <label htmlFor="price">Product Price: </label>
                <input type="text"
                  className="form-control"
                  id="productPrice"
                  value={this.state.price}
                  onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Available Stock: </label>
                <input type="text"
                  className="form-control"
                  id="productStock"
                  defaultValue={this.state.stock}
                  onChange={this.getInputValues} />
              </div>

              <div className="form-group">
                <label htmlFor="image">Product Image: </label>
                <input type="text"
                  name="image"
                  className="form-control"
                  id="productImage"
                  defaultValue={this.state.image}
                  onChange={this.getInputValues} />
              </div>

              <button className="btn btn-outline-success btn" type="submit">Update Product</button>
            </form>
 */