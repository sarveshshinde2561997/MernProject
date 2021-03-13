import React from 'react'
import { Link } from "react-router-dom";

export function Login() {
    function login() {
        
    }
    return (
        <div>
                <div className="container ">
                    <h2 className="text-center">Login</h2>
                    <div  className="pt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
      </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">
                                Mobile
      </label>
                            <input
                                type="number"
                                maxLength="10"
                                className="form-control"
                                id="mobile"
                                placeholder="Enter mobile"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
      </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
      </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={login} >
                                Register
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
