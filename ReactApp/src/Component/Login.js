import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

export function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useState(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
    }, [])

    const Login = async () => {
        const obj = {
            username: username,
            password: password
        }
        // const headers = {
        //     "Content-Type": "application/json"
        // };
        // const res = await fetch('http://localhost:8000/chatroom/login', {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(obj)
        // })

        axios.post("http://localhost:8000/chatroom/login", obj).then((res) => {
            const data = res.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data.result));
            history.push('/dashboard')
        }).catch((err) => {
            console.log(err);
        });
    }
    const imgUrl = "https://static.wixstatic.com/media/8cb055_1a9746aff5f3484499318c22de1bccc9~mv2_d_7952_4472_s_4_2.jpg/v1/fill/w_640,h_846,al_b,q_85,usm_0.66_1.00_0.01/8cb055_1a9746aff5f3484499318c22de1bccc9~mv2_d_7952_4472_s_4_2.webp";

    return (
        <div>
            <div className="row bg-green">
                <div className="col-md-5">
                    <div className="leftside">
                        <img className="img-fluid" src={imgUrl} />
                    </div>
                </div>
                <div className="col-md-7 login-sub-wrapper">
                    <div className="rightside container">
                        <div className="login-sub-wrapper">
                            <h2 className="text-center">Login</h2>
                            <div className="pt-4 login-box">
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
                                    <button className="btn1 mt-3 mb-5" onClick={() => Login()} >
                                        Login
      </button>
                                    <Link to="/signup">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
