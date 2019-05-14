import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { NavLink, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from './logo.png';
import CanvasJSReact from './canvasjs.react';
import './App.css';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


const TimeQuery = gql`{
  KPIs {
    PPT, 
    PT, 
    FT,
    FP,
    RP
  }
  resourceUsage{
    total,
    resource{
      Count,
      Description,
      ResourceName
    }
  }
}`;

class App extends Component {
  render() {
          const {data: {loading, resourceUsage, KPIs}} = this.props;
      if(loading){
        return null;
      }
      let dataPoints = [];
      resourceUsage.resource.map((resource, index) => {
        dataPoints[index] ={
          y: Math.round(resource.Count * 100 / resourceUsage.total),
          label: resource.ResourceName,
          labelToolTip: resource.Description
        } 
      });
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Resource Usage"
        },
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{labelToolTip}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: dataPoints
        }]
      }
    return (
      <div>
        <Navbar bg="light" variant="light" style={{ minWidth: 700 }}>
          <Navbar.Brand href="#home">
            <img src={logo} width="65.8px" height="52px" alt="TalTech Logo" />
          </Navbar.Brand>
          <Nav pullRight>
            <span>Currently Using Data From</span>
            <Nav.Link href="#">
              {" "}
              <a href="www.google.com">Festo_line_TalTech.accdb</a>
            </Nav.Link>
            <Nav.Link href="#">
              <Button variant="outline-primary">Upload Newer</Button>
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="row">
          <div className = "col-4">
            <CanvasJSChart options={options} />
          </div>
          <div className = "col-2">
             <p>Planned Production Time PPT (sec)</p>
             <h3>{KPIs.PPT}</h3>
             <br/>
             <br/>
             <p>Finished Products FP</p>
             <h3>{KPIs.FP}</h3>
             <br/>
             <br/>
             <p>Operating Time OP (sec)</p>
             <h3>{KPIs.PPT-KPIs.FT}</h3>
          </div>
          <div className = "col-2">
             <p>Production Time PT (sec)</p>
             <h3>{KPIs.PT}</h3>
             <br/>
             <br/>
             <p>Rejected Products RP</p>
             <h3>{KPIs.RP}</h3>
             <br/>
             <br/>
             <p>Availability Factor A</p>
             <h3>{Math.round((KPIs.PPT-KPIs.FT)*100/KPIs.PPT)} %</h3>
          </div>
          <div className = "col-2">
             <p>Resource Utilization</p>
             <h3>{Math.round(KPIs.PT/KPIs.PPT*100)} %</h3>
             <br/>
             <br/>
             <p>Failure Time FT (sec)</p>
             <h3>{KPIs.FT}</h3>
             <br/>
             <br/>
             <p>Quality Factor Q</p>
             <h3>{Math.round((KPIs.RP/KPIs.FP)*100)} %</h3>
          </div>

        </div>
      </div>
    );
  }
}

export default graphql(TimeQuery)(App);

