import React, {Component} from "react";
import { Link } from 'react-router-dom';
import logo from '../logo.png';
 
export default class Navigation extends Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/"> 
                    <img src={logo} width="65.8px" height="52px" alt="TalTech Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
 
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Operational Dashboard <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tactical">Tactical Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}