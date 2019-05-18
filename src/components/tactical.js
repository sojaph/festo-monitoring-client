import React, {Component} from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CanvasJSReact from '../canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TimeQuery = gql`{
    KPIs {
        ICT,
        ACT,
        PPT, 
        PT{
            PT,
            Description
        }, 
        FT,
        FP,
        RP
      }
    resourceUsage{
        resource{
          TotalTime,
          Description,
          ResourceName
        }
      }
  }`;

class TacticalDashboard extends Component {
    render() {
        const {data: {loading, resourceUsage, KPIs}} = this.props;
        if(loading){
          return null;
        }
        const Q = Math.round((1 - KPIs.RP/KPIs.FP)*100);
        const A = Math.round((KPIs.PPT-KPIs.FT)*100/KPIs.PPT);
        const P = Math.round(KPIs.ICT * 100 / KPIs.ACT);
        let dataPoints = [];
        resourceUsage.resource.map((resource, index) => {
          dataPoints[index] ={
            y: (resource.TotalTime * 100 / KPIs.PPT).toFixed(2),
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
            startAngle: 60,
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
          <div className="row">
            <div className = "col-6">
              <CanvasJSChart options={options} />
            </div>
            <div className = "col-6">
                <div className = "row">
                    <div className = "col-3">
                        <p>Quality Factor Q</p>
                        <h3>{Q} %</h3>
                    </div>
                    <div className = "col-3">
                        <p>Availability Factor A</p>
                        <h3>{A} %</h3>
                    </div>
                    <div className = "col-3">
                        <p>Performance Factor P</p>
                        <h3>{P} %</h3>
                    </div>
                </div>
                <br/>
                <br/>
                <h5>Overall Equipment Effectivness OEE</h5>
                <h2>{(Q*A*P/10000).toFixed(2)} %</h2>
            </div>
          </div>
        </div>
      );
    }
}
export default graphql(TimeQuery)(TacticalDashboard);