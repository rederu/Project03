import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import "./App.css";
//import the routes
import Navbar from "./components/navbar";
import Banner from "./components/Banner";
import Routes from "./routes";

class App extends Component {
 /*constructor(props) {
        super(props);
        this.state = {
            location: '/'
        }

    }
  componentDidMount = () => {
  
    //chech the window object in order to tell the path
    window.addEventListener("load",() => {
      
     if(window.location.pathname === "/additem"){
       //so we can hide the additem option on the menu
      this.setState({ location: window.location.pathname });
     }
 
    })

    //listen to the changes in the router
    this.unlistenHistory = this.props.history.listen((location) => {
      this.setState({ location: location.pathname });
     
    });
  }*/

  
  render() {

    return (
      <div className="App">
        <Navbar/>
        <Banner/>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);