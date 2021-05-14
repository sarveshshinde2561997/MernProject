import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "../Component/About";
import Home from '../Component/Home';
import Contact from "../Component/Contact";
import { Switch, Route, Link, useHistory } from "react-router-dom";
export default function Nvabar() {

    const history = useHistory();

    useEffect(() => {
        if (!document.cookie) {
            history.push("/login")
        }
    })

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Official LYNC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <div className="mr-3"><Link to="/home">Home</Link></div>
                        <div className="mr-3"><Link to="/about">About</Link></div>
                        <div className="mr-3"><Link to="/contact">Contact</Link></div>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/contact' component={Contact}></Route>
        </div>
    )
}
