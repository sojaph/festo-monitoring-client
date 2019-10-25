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
            pt,
            description
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
    returnCSS(percentage) {
      return {
        width: `${percentage}%`,
        height: "100%",
        backgroundColor: "#276e36",
      }
    }
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
            text: "Resource Utilization"
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
            <div className = "col-6 text-center">
                <div className = "row">
                    <div className = "col-4 text-center">
                        <p>Quality Factor <b>Q</b></p>
                        <div className = "myprogress">
                          <div style = {this.returnCSS(Q)}></div>
                        </div>
                        <h4>{Q} %</h4>
                    </div>
                    <div className = "col-4 text-center">
                        <p>Availability Factor <b>A</b></p>
                        <div className = "myprogress">
                          <div style = {this.returnCSS(A)}></div>
                        </div>
                        <h4>{A} %</h4>
                    </div>
                    <div className = "col-4 text-center">
                        <p>Performance Factor <b>P</b></p>
                        <div className = "myprogress">
                          <div style = {this.returnCSS(P)}></div>
                        </div>
                        <h4>{P} %</h4>
                    </div>
                </div>
                <br/>
                <br/>
                <h5>Overall Equipment Effectivness OEE</h5>
                <div className = "myprogress">
                  <div style = {this.returnCSS((Q*A*P/10000).toFixed(2))}></div>
                </div>
                <h2>{(Q*A*P/10000).toFixed(2)} %</h2>
            </div>
          </div>
        </div>
      );
    }
}
export default graphql(TimeQuery)(TacticalDashboard);