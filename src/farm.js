import React from 'react';
import './style/farm.css';
import Image from 'react-image-resizer';

class Farm extends React.Component{

  render(){

    if (this.props.hor === 6){
      return (
        <div className="farm_im">
          <Image src={this.props.disp[this.props.apples_picked]} height={800}/>
        </div>
          );
    }
    else if (this.props.hor === 1){
      return (
        <div className="farm_im">
          <Image src={this.props.disp[this.props.apples_picked+5]} height={800}/>
        </div>
          );
        }
    }
};

export default Farm;
