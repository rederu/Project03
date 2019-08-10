import React, { Component } from 'react';
//import swal from 'sweetalert';
import { login } from '../components/UserFunctions';

class Login extends Component {
    constructor() {

        super()
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user)
            .then(res => {
                if (res) {
                    this.props.history.push('/main');
                } else {
                    //swal("Wrong username or password", "Please verify you username and password.", "error");
                    this.props.history.push('/login');
                }
            })

    }

    render() {
        return (
            <div className="container dLogin">
                <div className="row loginWindow">
                    <div className="col-md-6 mt-5 mb-5 pb-5 mx-auto ">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Pasword Input"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button className="btn btn-outline-primary submitLogin mr-5 mt-5  btn-block">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;