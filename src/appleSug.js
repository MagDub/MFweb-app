import React from 'react';
import TreeTraining from './treeTraining';

class AppleSug extends React.Component{


  render(){
    return (

      <div className="appleSug">

      <TreeTraining value={this.props.value} col={this.props.col}/>

      </div>

    );
  }

};

export default AppleSug;
