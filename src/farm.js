import React from 'react';
import './style/farm.css';

class Farm extends React.Component{

  render(){

        return (
            <div className={this.props.disp[this.props.apples_picked]}>
              <div className={this.props.disp[this.props.apples_picked+1]}>
              </div>
            </div>
            );
    }
};

export default Farm;
