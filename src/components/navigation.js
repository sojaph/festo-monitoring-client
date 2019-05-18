import React, {Component} from "react";
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 
export default class Navigation extends Component{
    render(){
        return (
            <div>
                <Navbar bg="light" variant="light" style={{ minWidth: 700 }}>
                <Navbar.Brand href="/">
                    <img src={logo} width="65.8px" height="52px" alt="TalTech Logo"/>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Operational Dashboard <span className="sr-only">(current)</span></Link>
                    <Link className="nav-link" to="/tactical">Tactical Dashboard</Link>
                </Nav>
                <Nav>
                    <h6 style = {{margin: "10px"}}>Currently using data from <a href = '#'>FestoMES.accdb</a></h6>
                    <button className = "btn btn-outline-primary">Upload New</button>
                </Nav>
                </Navbar>
            </div>
        )
    }
}