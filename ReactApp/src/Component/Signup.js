import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from 'axios';
export function Signup() {


    function register() {
        console.log("Register event");
        const obj = {
            name: document.getElementById('name').value,
            mobile: parseInt(document.getElementById('mobile').value),
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        axios.post('https://sarvtechmern.herokuapp.com/register', obj).then(
            (res) => {
                console.log(res)
            }
        ).catch((err) => {
            console.error(err);
        })
    }
    return (
        <div className="row bg-green">
            <div className="d-res-none col-md-5">
                <img className="d-res-none img-fluid" src="https://static.wixstatic.com/media/8cb055_1a9746aff5f3484499318c22de1bccc9~mv2_d_7952_4472_s_4_2.jpg/v1/fill/w_640,h_846,al_b,q_85,usm_0.66_1.00_0.01/8cb055_1a9746aff5f3484499318c22de1bccc9~mv2_d_7952_4472_s_4_2.webp" />
            </div>
            <div className="col-md-7 ">
                <div className="container mt-3">
                    <h2 className="text-center">Register</h2>
                    <div className="pt-4">
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
                            <button className="btn1 mt-3 mb-5" onClick={register} >
                                Register
      </button>
                            <Link to="/login"><p className="txt-green">Want to login?</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
