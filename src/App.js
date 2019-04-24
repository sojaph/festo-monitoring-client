import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './logo.png';
import CanvasJSReact from './canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TimeQuery = gql`{
  times {
    ONo,
    timeTaken
  }
  resourceUsage{
    count
    ResourceID
    Description
    total{
      total
    }
  }
}`;

class App extends Component {
  render() {
    const {data: {loading, resourceUsage}} = this.props;
    if(loading){
      return null;
    }
    let dataPoints = [];
    resourceUsage.map((resource, index) => {
      dataPoints[index] ={
        y: resource.count * 100 / resource.total[0].total,
        label: resource.Description
      } 
    });
    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "tblFinStep Resource Distribution"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
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
            <img src={logo} width="65.8px" height="52px" alt="TalTech Logo"/>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Strategy Dashboard</Nav.Link>
            <Nav.Link href="#features">Tactical Dashboard</Nav.Link>
          </Nav>
          <Nav>
          <span>Currently Using Data From</span>
          <Nav.Link href="#"> <a href="#">Festo_line_TalTech.accdb</a></Nav.Link>
            <Nav.Link href="#"><Button variant="outline-primary">Upload Newer</Button></Nav.Link>
          </Nav>
        </Navbar>
        <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
      </div>
    );
  }
}

export default graphql(TimeQuery)(App);

