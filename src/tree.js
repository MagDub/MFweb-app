import React from 'react';
import Image from 'react-image-resizer';


class Tree extends React.Component{

  render(){

    return (
        <Image
          src={this.props.disp_col[this.props.tree-1]}
          height={this.props.value*5.5}
          width={this.props.value*5.5}
        />
    );
  }
};

export default Tree;
