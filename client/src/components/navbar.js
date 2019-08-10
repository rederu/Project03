import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/main" className="nav-link">
                        Inventory
                </Link>
                </li>
                <li className="nav-item">
                    <Link to="/additem" className="nav-link">
                        Add Item
                </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                </a>
                </li>
            </ul>
        )

        return (
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <div className="navbar-brand mr-auto" ><h5>Haru Two Inventory</h5></div>
                <div className="navbar-nav text-white">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExample10"
                        aria-controls="navbarsExample10"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbar1"
                    >

                        {localStorage.usertoken ? userLink : loginRegLink}
                    </div>
                </div>

            </nav>
        )
    }
}

export default withRouter(Navbar);
