import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import './home.css';

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
}`;

class Home extends Component {
  render() {
          const {data: {loading, KPIs}} = this.props;
      if(loading){
        return null;
      }
    return (
      <div>
        <div className="row">
          <div className = "col-2 text-center">
             <p>Planned Production Time <b>PPT</b></p>
             <h3>{Math.round(KPIs.PPT/60)} min, {KPIs.PPT%60} sec</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Failure Time <b>FT</b></p>
             <h3>{KPIs.FT} [sec]</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Operating Time <b>OP</b></p>
             <h3>{Math.round((KPIs.PPT-KPIs.FT)/60)} min, {(KPIs.PPT-KPIs.FT)%60} sec</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Ideal Cycle Time <b>ICT</b></p>
             <h3>{(KPIs.ICT / 60).toFixed(2)} [min]</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Actual Cycle Time <b>ACT</b></p>
             <h3>{(KPIs.ACT / 60).toFixed(2)} [min]</h3>
             <br/>
             <br/>
          </div>
        </div>
        <div className="row">
          <div className = "col-2 text-center">
             <p>Finished Products <b>FP</b></p>
             <h3>{Math.round(KPIs.FP)}</h3>
          </div>
          <div className = "col-2 text-center">
             <p>Rejected Products <b>RP</b></p>
             <h3>{KPIs.RP}</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Ideal Production Rate <b>IPR</b></p>
             <h3>{Math.round((1 / KPIs.ICT) * 3600)} [units/hour]</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Actual Production Rate <b>APR</b></p>
             <h3>{Math.round((1 / KPIs.ACT) * 3600)} [units/hour]</h3>
             <br/>
             <br/>
          </div>
        </div>
        <div className="row">
          <div className = "col-2 text-center">
             <p>Processing Time <b>PT</b> for <b>{KPIs.PT[0].Description}</b></p>
             <h3>{Math.round(KPIs.PT[0].PT / 60)} min, {Math.round(KPIs.PT[0].PT % 60)} sec</h3>
          </div>
          <div className = "col-2 text-center">
             <p>Processing Time <b>PT</b> for <b>{KPIs.PT[1].Description}</b></p>
             <h3>{Math.round(KPIs.PT[1].PT)} [sec]</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Processing Time <b>PT</b> for <b>{KPIs.PT[2].Description}</b></p>
             <h3>{Math.round(KPIs.PT[2].PT)} [sec]</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2 text-center">
             <p>Processing Time <b>PT</b> for <b>{KPIs.PT[3].Description}</b></p>
             <h3>{Math.round(KPIs.PT[3].PT)} [sec]</h3>
             <br/>
             <br/>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(TimeQuery)(Home);

