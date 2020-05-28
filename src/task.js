import React from 'react';
import Game from './game';
import Instructions from './instructions';
import Training from './training';
import Questions from './questions';
import {withRouter} from 'react-router-dom';

class Task extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      UserNo:1,
      num_training:1,
      slide: 1,
      transition:4,
      percentage_to_pass: 1, // percentage to pass the training and questions
      };

    this.nextTransition = this.nextTransition.bind(this);

    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 && e.target === document.body) {
      e.preventDefault();
    }
    else if(e.keyCode === 39 && e.target === document.body) {
      e.preventDefault();
    }
    });
  }

  render(){

    this.listenner(this.state.transition)

    switch(this.state.transition) {

      case 1:
        console.log("task: transition 1 - instructions", "slide", this.state.slide)
        return <Instructions slide={this.state.slide}/>

      case 2:
        console.log("task: transition 2 - questions")
        return <Questions UserNo={this.state.UserNo} questions_nb={5} nextTransition={this.nextTransition}/>

      case 3:
        console.log("task: transition 3 - after questions instructions", "slide", this.state.slide)
        return <Instructions slide={this.state.slide}/>

      case 4:
        console.log("task: transition 4 - training")
        return <Training UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>

      case 5:
        console.log("task: transition 5 - instructions")
        return <Instructions slide={this.state.slide}/>

      case 6:
        console.log("task: transition 6 - start game")
        return <Game UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>

      case 7:
        console.log("task: transition 7")
        return null

      default:
  }
}

  listenner(transition){

    document.removeEventListener("keydown", this._handleKeyDownNumbers);
    document.removeEventListener("keydown", this._handleKeyDownEnter);
    document.removeEventListener("keydown", this._handleKeyDownArrows);
    document.removeEventListener("keydown", this._handleKeyDownRightArrow);

    switch (transition){
      case 1:
        if (this.state.slide===0 || this.state.slide===1){
          document.addEventListener("keydown", this._handleKeyDownRightArrow);
        }
        else {
          document.addEventListener("keydown", this._handleKeyDownArrows);
        }
        break;
      case 2:
        break;
      case 3: document.addEventListener("keydown", this._handleKeyDownRightArrow);
        break;
      case 4:
        break;
      case 5: document.addEventListener("keydown", this._handleKeyDownRightArrow);
        break;
      case 6:
        break;
      case 7:
        break;
      default:
    }
  }

  nextTransition(percentage_passed) {

    if (percentage_passed>=this.state.percentage_to_pass){
      this.setState({
        transition: this.state.transition+1,
      });
      }
      else {
      this.setState({
        transition: 1,
        slide: 0,
      });
      }
    }

  _handleKeyDownArrows = (event) => {

    switch( event.keyCode ) {

        /* arrow left.*/
        case 37:

            this.setState({slide: this.state.slide-1});

            break;

        /* arrow right.*/
        case 39:

            if(this.state.slide===21){
              this.setState({
                slide: this.state.slide+1,
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

  _handleKeyDownRightArrow = (event) => {

    switch( event.keyCode ) {

        /* arrow right.*/
        case 39:

            if(this.state.slide===22){
              this.setState({
                slide: this.state.slide+1,
                transition: this.state.transition+1,
              });
            }
            else if(this.state.slide===23){
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

export default withRouter(Task);
