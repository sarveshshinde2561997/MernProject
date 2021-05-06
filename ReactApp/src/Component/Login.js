import axios from 'axios';
import React, { useState } from 'react'
import { Link } from "react-router-dom";

export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Login = () => {
        const obj = {
            username: username,
            password: password
        }
        axios.post('https://sarvtechmern.herokuapp.com/login', obj).then(
            (res) => {
                console.log(res)
            }
        ).catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>
            <div className="container ">
                <h2 className="text-center">Login</h2>
                <div className="pt-4">
                    <div className="mb-3">
                        <label htmlFor="usename" className="form-label">
                            Username
      </label>
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
      </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={() => Login()} >
                            Login
      </button>
                        <button className="btn btn-sucess ml-3">
                            <Link to="/signup">Register</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
