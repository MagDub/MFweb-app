import React from 'react';
import TreeTraining from './treeTraining';
import './style/training.css';

class AppleSug extends React.Component{


  render(){
    return (

      <div className="appleSug">

      <TreeTraining value={this.props.value} col={this.props.col} training_apple_col={this.props.training_apple_col}/>

      </div>


    );
  }

};

export default AppleSug;
