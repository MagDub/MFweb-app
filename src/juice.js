import React from 'react';
import './style/juice.css';
import Image from 'react-image-resizer';


class Juice extends React.Component{

  render(){
    return (
        <div className="juice_im">
          <Image src={this.props.image_juice} height={800}/>
        </div>
    );
  }

};

export default Juice;
