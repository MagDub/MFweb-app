import React from 'react';
import TreeTraining from './treeTraining';

class AppleTraining extends React.Component{

  render(){
    return (

      <div className="apple">

      <TreeTraining value={this.props.value} col={this.props.col} training_apple_col={this.props.training_apple_col}/>

      </div>
    );
  }
};

export default AppleTraining;
