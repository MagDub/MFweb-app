import React from 'react';
import Game from './game';
import Button from 'react-bootstrap/Button'
import Instructions from './instructions';
import Training from './training';
import Questions from './questions';
import {withRouter} from 'react-router-dom';
import './style/task.css';


class Task extends React.Component{

  constructor(props) {
    super(props);

    var user_info = this.props.location.state.user_info;
    var UserNo = user_info.UserNo;

    var currentDate   = new Date();
    var InstructionsStartTime    = currentDate.toTimeString();

    this.state = {
      UserNo:UserNo,
      user_info: user_info,
      num_training:1,
      loading: 1,
      slide: 1,
      transition:0,
      percentage_to_pass: 1, // percentage to pass the training and questions
      InstructionsStartTime: InstructionsStartTime,
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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    setTimeout(
      function() {
        this.setState({
          transition: 1,
        });
      }
      .bind(this),
      100
    );

  }

  render(){

    this.listenner(this.state.transition)

    switch(this.state.transition) {

      case 0:
        return(
          <div>
            <div className="IntroConsentText">
              <p><span className="bold">STUDY PART 1/2</span></p>
                Thank you for joining our study. <br/>
                In the 1st part you will play a computer game and in the 2nd part you will
                be asked a few questions about yourself.<br/>
                If you are ready, press the button to be redirected to the game.
              <br/><br/>
              <div className="container">
                  <div className="center">
                    <Button variant="outline-success" size="lg" onClick={this.handleClick}> Let&#39;s start playing ! </Button>
                  </div>
              </div>
            </div>
          </div>
        );

      case 1:
        //console.log("task: transition 1", "slide", this.state.slide)
        return <Instructions slide={this.state.slide}/>

      case 2:
        //console.log("task: transition 2 - questions")
        return <Questions UserNo={this.state.UserNo} questions_nb={5} nextTransition={this.nextTransition} InstructionsStartTime={this.state.InstructionsStartTime}/>

      case 3:
        //console.log("task: transition 3 - after questions instructions", "slide", this.state.slide)
        return <Instructions slide={this.state.slide}/>

      case 4:
        //console.log("task: transition 4 - training")
        return <Training UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>

      case 5:
        //console.log("task: transition 5 - instructions")
        return <Instructions slide={this.state.slide}/>

      case 6:
        //console.log("task: transition 6 - start game")
        return <Game UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>

      case 7:
        //console.log("task: transition 7")
        this.props.history.push({
          pathname: `/Questionnaires`,
          state: {user_info: this.state.user_info}
        })
        return null

      default:
  }
}

  listenner(transition){

    document.removeEventListener("keyup", this._handleKeyDownNumbers);
    document.removeEventListener("keyup", this._handleKeyDownEnter);
    document.removeEventListener("keyup", this._handleKeyDownArrows);
    document.removeEventListener("keyup", this._handleKeyDownRightArrow);

    switch (transition){
      case 1:
        if (this.state.slide===0 || this.state.slide===1){
          document.addEventListener("keyup", this._handleKeyDownRightArrow);
        }
        else {
          document.addEventListener("keyup", this._handleKeyDownArrows);
        }
        break;
      case 2:
        break;
      case 3: document.addEventListener("keyup", this._handleKeyDownRightArrow);
        break;
      case 4:
        break;
      case 5: document.addEventListener("keyup", this._handleKeyDownRightArrow);
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

      var currentDate   = new Date();
      var InstructionsStartTime    = currentDate.toTimeString();

      var new_transition;
      var new_slide;

      if (this.state.transition===2) {
        new_transition=1;
        new_slide=0;
      }
      else if (this.state.transition===4) {
        new_transition=3;
        new_slide=24;
      };

      this.setState({
        InstructionsStartTime: InstructionsStartTime,
        transition: new_transition,
        slide: new_slide,
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
            else if(this.state.slide===24){
              this.setState({
                slide: 23,
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
