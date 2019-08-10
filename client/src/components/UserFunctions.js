import axios from 'axios';

export const register = newUser =>{
    return axios
    .post('/users/register', {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log('User Registered');
    })
}

export const login = user => {
    return axios.post('/users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err =>{
        console.log("Error: " + err)
    })
}