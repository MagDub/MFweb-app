import React from 'react';
import Game from './game';
import Button from 'react-bootstrap/Button'
import Instructions from './instructions';
import Training from './training';
import Questions from './questions';
import {withRouter} from 'react-router-dom';
import { API_URL } from './config';
import { handleResponse } from './helpers'; // imports json
import './style/task.css';
import Image from 'react-image-resizer';
import './style/intro.css';


class Task extends React.Component{

  constructor(props) {
    super(props);

    var user_info = this.props.location.state.user_info;

    var currentDate   = new Date();
    var InstructionsStartTime    = currentDate.toTimeString();

    this.state = {
      UserNo:[], //default
      user_info: user_info,
      num_training:10, // should be 10
      loading: 1,
      slide: 1,
      transition: 0, // starts at 0
      mounted: 0,
      fetched: 0,
      percentage_to_pass_questions: 1, // percentage to pass the training and questions
      percentage_to_pass_training: 0.8,
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

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({
          mounted: 1,
        });
      }
      .bind(this),
      5000
    );
  }

  fetchUserInfo () {
       fetch(`${API_URL}/questions_behaviour/last_user_no`)
         .then(handleResponse)
         .then((data) => {
           const user_no_ = parseInt(data['new_user_no'])
           //console.log("fetchUserInfo in Intro ", "user_no", user_no_)

           this.setState({
                   UserNo : user_no_,
                   fetched: 1,
               });
       })
         .catch((error) => {
          console.log(error)
       });
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

      this.listenner(this.state.transition);

      if (this.state.currentImage===0){
        return (
          <div className="slide_im">
              <Image src={this.props.loading_bg[this.state.currentImage]} height={800}/>
          </div>
        );}

      switch(this.state.transition) {

          case 0:
              return(
                <div>
                  <div className="place-middle">
                    <div className="IntroConsentText">
                      <p><span className="bold">STUDY PART 1/2</span></p>
                        Thank you for joining our study. <br/>
                        In the 1st part of the study you will play a computer game. <br/>
                        In the 2nd part you will be asked a few questions about yourself.<br/>
                        Press the button when you are ready.
                      <br/><br/>
                      <div className="container">
                          <div className="center">
                            <Button variant="outline-success" size="lg" onClick={this.handleClick}> Let&#39;s start playing ! </Button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

          case 1:
            //console.log("task: transition 1", "slide", this.state.slide)
            return <Instructions loading_bg={this.state.user_info.loading_bg} slide={this.state.slide} instruc_={this.state.user_info.instruc_bg}/>

          case 2:
            if (this.state.fetched===0){
              this.fetchUserInfo();
            }
            //console.log("task: transition 2 - questions")
            return <Questions loading_bg={this.state.user_info.loading_bg} questions_bg={this.state.user_info.questions_bg} training_no={this.state.user_info.training_no} task_no={this.state.user_info.task_no} prolific_id={this.state.user_info.prolific_id} StartTime={this.state.user_info.startTime} UserNo={this.state.UserNo} questions_nb={5} nextTransition={this.nextTransition} InstructionsStartTime={this.state.InstructionsStartTime}/>

          case 3:
            //console.log("task: transition 3 - after questions instructions", "slide", this.state.slide)
            return <Instructions slide={this.state.slide} instruc_={this.state.user_info.instruc_bg}/>

          case 4:
            //console.log("task: transition 4 - training")
            return <Training images_fb={this.state.user_info.images_fb} training_apple_col={this.state.user_info.training_apple_col} loading_bg={this.state.user_info.loading_bg} training_no={this.state.user_info.training_no} task_no={this.state.user_info.task_no} training_bg={this.state.user_info.training_bg} prolific_id={this.state.user_info.prolific_id} StartTime={this.state.user_info.startTime} UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>

          case 5:
            //console.log("task: transition 5 - instructions")
            return <Instructions slide={this.state.slide} instruc_={this.state.user_info.instruc_bg}/>

          case 6:
            //console.log("task: transition 6 - start game")
            return <Game user_info={this.state.user_info} UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>

          case 7:
            //console.log("task: transition 7")
            this.props.history.push({
              pathname: `/Questionnaires`,
              state: {user_info: this.state.user_info, UserNo: this.state.UserNo}
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

    //console.log("nextTransition", "percentage_passed", percentage_passed)

    if ((this.state.transition===2 && percentage_passed>=this.state.percentage_to_pass_questions)
          || (this.state.transition===4 && percentage_passed>=this.state.percentage_to_pass_training)
          || this.state.transition===6){
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
