import React from 'react';
import './style/block.css';
import Image from 'react-image-resizer';

class Block extends React.Component{


  render(){

    if (this.props.block_i<=this.props.BlockNb) {
      return (
        <div className="block_im">
          <Image src={this.props.block_start_bg[this.props.block_i-1]} height={800}/>
        </div>
        );
      }

    else  {
      console.log("in block", "this.props.block_finish_bg", this.props.block_finish_bg)
      return (
        <div className="block_im">
          <Image src={this.props.block_finish_bg} height={800}/>
        </div>
        );
      }
  }
};

export default Block;
