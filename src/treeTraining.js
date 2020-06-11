import React from 'react';
import Image from 'react-image-resizer';


class TreeTraining extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      apple_col:["images/images_training/apple_1.png","images/images_training/apple_2.png","images/images_training/apple_3.png","images/images_training/apple_4.png"],
      };
  }

  componentDidMount() {
    this.state.apple_col.forEach(image => { new Image().src = image })
  }

  render(){

    return (

        <Image
          src={this.state.apple_col[this.props.col-1]}
          height={this.props.value*5.5}
          width={this.props.value*5.5}
        />

    );
  }
};

export default TreeTraining;
