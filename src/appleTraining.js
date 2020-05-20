import React from 'react';
import TreeTraining from './treeTraining';

class AppleTraining extends React.Component{

  render(){
    return (

      <div className="apple">

      <TreeTraining value={this.props.value} col={this.props.col}/>

      </div>
    );
  }
};

export default AppleTraining;
