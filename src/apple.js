import React from 'react';
import Tree from './tree';
import './style/game.css';

class Apple extends React.Component{

  render(){
    return (
        <div className="appleTask">
          <Tree value={this.props.value} tree={this.props.tree} disp_col={this.props.disp_col}/>
        </div>
    );
  }

};

export default Apple;
