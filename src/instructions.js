import React from 'react';

class Instructions extends React.Component{

  constructor(props) {
    super(props);

    this.state = {

      instruc:["slide_0", "slide_1", "slide_2", "slide_3", "slide_4", "slide_5", "slide_6", "slide_7", "slide_8", "slide_9", "slide_10", "slide_11", "slide_12", "slide_13", "slide_14", "slide_15", "slide_16", "slide_17", "slide_18", "slide_19", "slide_20", "slide_21"],

      };
  }

  render(){

      return (

        <div className={this.state.instruc[this.props.slide-1]}>

          <div className={this.state.instruc[this.props.slide]}>

          </div>

        </div>

      );
    }

};



export default Instructions;
