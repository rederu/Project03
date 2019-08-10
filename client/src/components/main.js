import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Main extends Component {

  state = {
    items: []
  }


  componentDidMount = () => {
    console.log("mounted");
    fetch("/items").then(res => {
      return res.json();
    }).then(blob => {
      this.setState({ items: blob.data });
      // console.log(this.state.items)
    })
  }




  render() {

    return (
      <React.Fragment>
        <header>
          <h1 className="fragmentTitle">Inventory</h1>
        </header>
        <section>
          <h2 className="fragmentTitle">Available Items</h2>
          <div className="itemsContainer">
              {this.state.items.map(item => {
                return (
                  <div className="item" key={item._id}>
                    <div className="card itemsCard">
                      <div className="card-body">
                        <img className="card-img-top cardsImg" src={item.image} />
                        <div className="card-title cardsTitle">
                          <Link to={"item/" + item._id}><h5>{item.name}</h5></Link>
                        </div>
                      </div>
                    </div>
                  </div>

                )
              })}
            </div>
        </section>

      </React.Fragment>
    );
  }
}

export default Main;
