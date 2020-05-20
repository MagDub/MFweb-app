import React from 'react';
import Game from './game';
import Instructions from './instructions';
import Training from './training';

class Task extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      UserNo:1,
      num_training:3,
      slide: 20,
      transition:2,
      pass_training: 0.6, // percentage to pass the training
      };

    this.nextTransition = this.nextTransition.bind(this);
  }

  render(){

    if (this.state.transition === 1) {

      console.log("task: transition 1 - instructions")

      /* listens to keyboard presses.*/
      document.addEventListener("keydown", this._handleKeyDownArrows);

      return (
        <Instructions slide={this.state.slide}/>
      );
    }

    else if (this.state.transition === 2) {

      console.log("task: transition 2 - training")

      document.removeEventListener("keydown", this._handleKeyDownArrows);

      return <Training UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>
    }

    else if (this.state.transition === 3) {

      // To do: add slide:
      // + add questions somewhere (before training? or after?)
      // add slide: good intuition we can now start_block, or lets redo instructions

      console.log("task: transition 3 - instructions")

      document.removeEventListener("keydown", this._handleKeyDownNumbers);
      document.removeEventListener("keydown", this._handleKeyDownEnter);
      document.addEventListener("keydown", this._handleKeyDownArrows);

      return (
        <Instructions slide={this.state.slide}/>
      );
    }

    else if (this.state.transition === 4) {

      console.log("task: transition 4 - start game")

      document.removeEventListener("keydown", this._handleKeyDownArrows);
      return <Game UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>
    }

    else if (this.state.transition === 5) {

      console.log("task: transition 5")
      return null

    }
  }

  nextTransition(percentage_passed) {

    console.log("nextTransition", "percentage_passed", percentage_passed)

    if (percentage_passed>=this.state.pass_training){
      this.setState({
        transition: this.state.transition+1,
      });
      }
      else {
      this.setState({
        transition: this.state.transition-1,
      });
      }
    }

  _handleKeyDownArrows = (event) => {

    switch( event.keyCode ) {

        /* arrow left.*/
        case 37:

            if(this.state.slide===1){
              this.setState({slide: this.state.slide});
            }
            else {
              this.setState({slide: this.state.slide-1});
            }

            break;

        /* arrow right.*/
        case 39:

            if(this.state.slide===20){
              this.setState({
                slide: this.state.slide+1,
                transition: this.state.transition+1,
              });
            }
            else if(this.state.slide===21){
              this.setState({
                transition: this.state.transition+1,
              });
            }
            else {
              this.setState({slide: this.state.slide+1});
            }

            break;

        default:
      }
  }

};

export default Task;
