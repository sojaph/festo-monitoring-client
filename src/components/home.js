import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import '../App.css';

const TimeQuery = gql`{
  KPIs {
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
          {/* <div className = "col-4">
            <CanvasJSChart options={options} />
          </div> */}
          <div className = "col-2">
             <p>Planned Production Time PPT</p>
             <h3>{Math.round(KPIs.PPT / 60)} (min)</h3>
             <br/>
             <br/>
             <p>Finished Products FP</p>
             <h3>{Math.round(KPIs.FP)}</h3>
             <br/>
             <br/>
             <p>Operating Time OP</p>
             <h3>{Math.round(KPIs.PPT-KPIs.FT)} (sec)</h3>
          </div>
          <div className = "col-2">
             <p>Rejected Products RP</p>
             <h3>{KPIs.RP}</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2">
             <p>Failure Time FT</p>
             <h3>{KPIs.FT} (sec)</h3>
             <br/>
             <br/>
             <p>Processing Time PT for {KPIs.PT[3].Description}</p>
             <h3>{Math.round(KPIs.PT[3].PT)} (sec)</h3>
             <br/>
             <br/>
          </div>
          <div className = "col-2">
             <p>Processing Time PT for {KPIs.PT[0].Description}</p>
             <h3>{Math.round(KPIs.PT[0].PT)} (sec)</h3>
             <br/>
             <br/>
             <p>Processing Time PT for {KPIs.PT[1].Description}</p>
             <h3>{Math.round(KPIs.PT[1].PT)} (sec)</h3>
             <br/>
             <br/>
             <p>Processing Time PT for {KPIs.PT[2].Description}</p>
             <h3>{Math.round(KPIs.PT[2].PT)} (sec)</h3>
             <br/>
             <br/>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(TimeQuery)(Home);

