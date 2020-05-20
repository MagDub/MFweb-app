import React from 'react';
import Image from 'react-image-resizer';


class Tree2 extends React.Component{

  render(){
    return (

        <Image
          src="images/images_set1/apple_2.png"
          height={this.props.value*5.5}
          width={this.props.value*5.5}
        />

    );
  }
};

export default Tree2;
