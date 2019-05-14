import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CanvasJSReact from './canvasjs.react';
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
class Tactical extends Component {
    render() {
        const {data: {loading, resourceUsage, KPIs}} = this.props;
    if(loading){
      return null;
    }
    let dataPoints = [];
    resourceUsage.resource.map((resource, index) => {
      dataPoints[index] ={
        y: resource.Count * 100 / resourceUsage.total,
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
                <CanvasJSChart options={options} />
            </div>
        )
    }
}

export default graphql(TimeQuery)(Tactical);