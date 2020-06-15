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


class Task extends React.Component{

  constructor(props) {
    super(props);

    var user_info = this.props.location.state.user_info;

    var currentDate   = new Date();
    var InstructionsStartTime    = currentDate.toTimeString();

    this.state = {
      mounted: 0,
      UserNo:[], //default
      user_info: user_info,
      num_training:10,
      loading: 1,
      slide: 1,
      transition: 1,
      fetched: 0,
      percentage_to_pass_questions: 1, // percentage to pass the training and questions
      percentage_to_pass_training: 0.8,
      InstructionsStartTime: InstructionsStartTime,

      training_bg:["images/images_training/training_1_empty.png","images/images_training/training_2_empty.png","images/images_training/training_3_empty.png","images/images_training/training_4_empty.png"],
      instruc_bg:["images/instructions/slide_empty_1arrow.png", "images/instructions/slide_empty_2arrows.png", "images/instructions/slide6.png", "images/instructions/slide7.png", "images/instructions/slide8.png", "images/instructions/slide9.png", "images/instructions/slide10.png", "images/instructions/slide11.png", "images/instructions/slide12.png", "images/instructions/slide13.png", "images/instructions/slide14.png", "images/instructions/slide15.png", "images/instructions/slide16.png", "images/instructions/slide17.png", "images/instructions/slide18.png"],
      questions_bg:["images/instructions/slide_empty_0arrow.png"],
      loading_bg: ["images/loading.jpg"],
      image_bg_1:["images/images_set1/sun_1.png", "images/images_set1/sun_2.png", "images/images_set1/sun_3.png", "images/images_set1/sun_4.png", "images/images_set1/sun_5.png", "images/images_set1/sun_6.png", "images/images_set1/sun_7.png"],
      image_bg_2:["images/images_set2/sun_1.png", "images/images_set2/sun_2.png", "images/images_set2/sun_3.png", "images/images_set2/sun_4.png", "images/images_set2/sun_5.png", "images/images_set2/sun_6.png", "images/images_set2/sun_7.png"],
      image_bg_3:["images/images_set3/sun_1.png", "images/images_set3/sun_2.png", "images/images_set3/sun_3.png", "images/images_set3/sun_4.png", "images/images_set3/sun_5.png", "images/images_set3/sun_6.png", "images/images_set3/sun_7.png"],
      image_bg_4:["images/images_set4/sun_1.png", "images/images_set4/sun_2.png", "images/images_set4/sun_3.png", "images/images_set4/sun_4.png", "images/images_set4/sun_5.png", "images/images_set4/sun_6.png", "images/images_set4/sun_7.png"],
      image_bg_5:["images/images_set5/sun_1.png", "images/images_set5/sun_2.png", "images/images_set5/sun_3.png", "images/images_set5/sun_4.png", "images/images_set5/sun_5.png", "images/images_set5/sun_6.png", "images/images_set5/sun_7.png"],
      image_bg_6:["images/images_set6/sun_1.png", "images/images_set6/sun_2.png", "images/images_set6/sun_3.png", "images/images_set6/sun_4.png", "images/images_set6/sun_5.png", "images/images_set6/sun_6.png", "images/images_set6/sun_7.png"],
      image_bg_7:["images/images_set7/sun_1.png", "images/images_set7/sun_2.png", "images/images_set7/sun_3.png", "images/images_set7/sun_4.png", "images/images_set7/sun_5.png", "images/images_set7/sun_6.png", "images/images_set7/sun_7.png"],
      image_bg_8:["images/images_set8/sun_1.png", "images/images_set8/sun_2.png", "images/images_set8/sun_3.png", "images/images_set8/sun_4.png", "images/images_set8/sun_5.png", "images/images_set8/sun_6.png", "images/images_set8/sun_7.png"],
      juice_small_bg:["images/juice_small/juice1.png", "images/juice_small/juice2.png", "images/juice_small/juice3.png", "images/juice_small/juice4.png", "images/juice_small/juice5.png", "images/juice_small/juice6.png", "images/juice_small/juice7.png", "images/juice_small/juice8.png", "images/juice_small/juice9.png", "images/juice_small/juice10.png"],
      juice_big_bg:["images/juice_big/juice1.png", "images/juice_big/juice2.png", "images/juice_big/juice3.png", "images/juice_big/juice4.png", "images/juice_big/juice5.png", "images/juice_big/juice6.png", "images/juice_big/juice7.png", "images/juice_big/juice8.png", "images/juice_big/juice9.png", "images/juice_big/juice10.png"],
      block_start_bg:["images/block_images/startblock_1.jpg", "images/block_images/startblock_1.jpg", "images/block_images/startblock_2.jpg", "images/block_images/startblock_3.jpg", "images/block_images/startblock_4.jpg"],
      block_finish_bg:["images/block_images/finishblock_1.jpg", "images/block_images/finishblock_1.jpg", "images/block_images/finishblock_2.jpg", "images/block_images/finishblock_3.jpg", "images/block_images/finishblock_4.jpg"],
      apple_col1:["images/images_set1/apple_1.png","images/images_set1/apple_2.png","images/images_set1/apple_3.png"],
      apple_col2:["images/images_set2/apple_1.png","images/images_set2/apple_2.png","images/images_set2/apple_3.png"],
      apple_col3:["images/images_set3/apple_1.png","images/images_set3/apple_2.png","images/images_set3/apple_3.png"],
      apple_col4:["images/images_set4/apple_1.png","images/images_set4/apple_2.png","images/images_set4/apple_3.png"],
      apple_col5:["images/images_set5/apple_1.png","images/images_set5/apple_2.png","images/images_set5/apple_3.png"],
      apple_col6:["images/images_set6/apple_1.png","images/images_set6/apple_2.png","images/images_set6/apple_3.png"],
      apple_col7:["images/images_set7/apple_1.png","images/images_set7/apple_2.png","images/images_set7/apple_3.png"],
      apple_col8:["images/images_set8/apple_1.png","images/images_set8/apple_2.png","images/images_set8/apple_3.png"],
      training_apple_col:["images/images_training/apple_1.png","images/images_training/apple_2.png","images/images_training/apple_3.png","images/images_training/apple_4.png"],
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

    var training_bg = this.state.training_bg;
    var instruc_bg = this.state.instruc_bg;
    var questions_bg = this.state.questions_bg;
    var loading_bg = this.state.loading_bg;
    var image_bg_1 = this.state.image_bg_1;
    var image_bg_2 = this.state.image_bg_2;
    var image_bg_3 = this.state.image_bg_3;
    var image_bg_4 = this.state.image_bg_4;
    var image_bg_5 = this.state.image_bg_5;
    var image_bg_6 = this.state.image_bg_6;
    var image_bg_7 = this.state.image_bg_7;
    var image_bg_8 = this.state.image_bg_8;
    var juice_small_bg = this.state.juice_small_bg;
    var juice_big_bg = this.state.juice_big_bg;
    var block_start_bg = this.state.block_start_bg;
    var block_finish_bg = this.state.block_finish_bg;
    var apple_col1 = this.state.apple_col1;
    var apple_col2 = this.state.apple_col2;
    var apple_col3 = this.state.apple_col3;
    var apple_col4 = this.state.apple_col4;
    var apple_col5 = this.state.apple_col5;
    var apple_col6 = this.state.apple_col6;
    var apple_col7 = this.state.apple_col7;
    var apple_col8 = this.state.apple_col8;
    var training_apple_col = this.state.training_apple_col;

    training_bg.forEach(image => { new Image().src = image })
    instruc_bg.forEach(image => { new Image().src = image })
    questions_bg.forEach(image => { new Image().src = image })
    loading_bg.forEach(image => { new Image().src = image })
    image_bg_1.forEach(image => { new Image().src = image })
    image_bg_2.forEach(image => { new Image().src = image })
    image_bg_3.forEach(image => { new Image().src = image })
    image_bg_4.forEach(image => { new Image().src = image })
    image_bg_5.forEach(image => { new Image().src = image })
    image_bg_6.forEach(image => { new Image().src = image })
    image_bg_7.forEach(image => { new Image().src = image })
    image_bg_8.forEach(image => { new Image().src = image })
    juice_small_bg.forEach(image => { new Image().src = image })
    juice_big_bg.forEach(image => { new Image().src = image })
    block_finish_bg.forEach(image => { new Image().src = image })
    block_start_bg.forEach(image => { new Image().src = image })
    apple_col1.forEach(image => { new Image().src = image })
    apple_col2.forEach(image => { new Image().src = image })
    apple_col3.forEach(image => { new Image().src = image })
    apple_col4.forEach(image => { new Image().src = image })
    apple_col5.forEach(image => { new Image().src = image })
    apple_col6.forEach(image => { new Image().src = image })
    apple_col7.forEach(image => { new Image().src = image })
    apple_col8.forEach(image => { new Image().src = image })
    training_apple_col.forEach(image => { new Image().src = image })

    this.setState({
      training_bg: training_bg,
      instruc_bg: instruc_bg,
      questions_bg: questions_bg,
      loading_bg: loading_bg,
      image_bg_1: image_bg_1,
      image_bg_2: image_bg_2,
      image_bg_3: image_bg_3,
      image_bg_4: image_bg_4,
      image_bg_5: image_bg_5,
      image_bg_6: image_bg_6,
      image_bg_7: image_bg_7,
      image_bg_8: image_bg_8,
      apple_col1: apple_col1,
      apple_col2: apple_col2,
      apple_col3: apple_col3,
      apple_col4: apple_col4,
      apple_col5: apple_col5,
      apple_col6: apple_col6,
      apple_col7: apple_col7,
      apple_col8: apple_col8,
      training_apple_col: training_apple_col,
      juice_small_bg: juice_small_bg,
      juice_big_bg: juice_big_bg,
      block_finish_bg: block_finish_bg,
      block_start_bg: block_start_bg,
      mounted: 1,
    });
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

    if (this.state.mounted===1){

      this.listenner(this.state.transition);

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
            return <Instructions loading_bg={this.state.loading_bg} slide={this.state.slide} instruc_={this.state.instruc_bg}/>

          case 2:
            if (this.state.fetched===0){
              this.fetchUserInfo();
            }
            //console.log("task: transition 2 - questions")
            return <Questions loading_bg={this.state.loading_bg} questions_bg={this.state.questions_bg} training_no={this.state.user_info.training_no} task_no={this.state.user_info.task_no} prolific_id={this.state.user_info.prolific_id} StartTime={this.state.user_info.startTime} UserNo={this.state.UserNo} questions_nb={5} nextTransition={this.nextTransition} InstructionsStartTime={this.state.InstructionsStartTime}/>

          case 3:
            //console.log("task: transition 3 - after questions instructions", "slide", this.state.slide)
            return <Instructions slide={this.state.slide} instruc_={this.state.instruc_bg}/>

          case 4:
            //console.log("task: transition 4 - training")
            return <Training training_apple_col={this.state.training_apple_col} loading_bg={this.state.loading_bg} training_no={this.state.user_info.training_no} task_no={this.state.user_info.task_no} training_bg={this.state.training_bg} prolific_id={this.state.user_info.prolific_id} StartTime={this.state.user_info.startTime} UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>

          case 5:
            //console.log("task: transition 5 - instructions")
            return <Instructions slide={this.state.slide} instruc_={this.state.instruc_bg}/>

          case 6:
            //console.log("task: transition 6 - start game")
            return <Game apple_col1={this.state.apple_col1} apple_col2={this.state.apple_col2} apple_col3={this.state.apple_col3} apple_col4={this.state.apple_col4} apple_col5={this.state.apple_col5} apple_col6={this.state.apple_col6} apple_col7={this.state.apple_col7} apple_col8={this.state.apple_col8} block_start_bg={this.state.block_start_bg} block_finish_bg={this.state.block_finish_bg} juice_small_bg={this.state.juice_small_bg} juice_big_bg={this.state.juice_big_bg} image_bg_1={this.state.image_bg_1} image_bg_2={this.state.image_bg_2} image_bg_3={this.state.image_bg_3} image_bg_4={this.state.image_bg_4} image_bg_5={this.state.image_bg_5} image_bg_6={this.state.image_bg_6} image_bg_7={this.state.image_bg_7} image_bg_8={this.state.image_bg_8} training_no={this.state.user_info.training_no} task_no={this.state.user_info.task_no} prolific_id={this.state.user_info.prolific_id} StartTime={this.state.user_info.startTime} UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>

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

    else return null;
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

    if ((this.state.transition===2 && percentage_passed>=this.state.percentage_to_pass_questions)
          || (this.state.transition===4 && percentage_passed>=this.state.percentage_to_pass_training)){
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
