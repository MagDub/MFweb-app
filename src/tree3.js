import React from 'react';
import Image from 'react-image-resizer';


class Tree3 extends React.Component{

  render(){
    return (

        <Image
          src="images/images_set1/apple_3.png"
          height={this.props.value*5.5}
          width={this.props.value*5.5}
        />

    );
  }
};

export default Tree3;
