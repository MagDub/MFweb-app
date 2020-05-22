import React from 'react';
import './style/block.css';

class Block extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      block_start:["startblock_1", "startblock_1", "startblock_2", "startblock_3", "startblock_4"],
      block_finish:["finishblock_1", "finishblock_1", "finishblock_2", "finishblock_3", "finishblock_4"],
    };

  }

  render(){

    if (this.props.block_i<=this.props.BlockNb) {

      return (
        <div className={this.state.block_start[this.props.block_i]}>

        </div>
        );
      }

    else  {
      return (
        <div className={this.state.block_finish[this.props.block_i-1]}>

        </div>
        );
      }
  }
};

export default Block;
