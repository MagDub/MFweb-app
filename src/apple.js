import React from 'react';
import Tree from './tree';

class Apple extends React.Component{

  render(){
    return (

      <div className="apple">

      <Tree value={this.props.value} tree={this.props.tree} col={this.props.col}/>

      </div>

    );
  }

};

export default Apple;
