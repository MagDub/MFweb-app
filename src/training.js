import React from 'react';
import './style/training.css';
import AppleTraining from './appleTraining';
import AppleSug from './appleSug';
import Feedback from './feedback.js';
import { API_URL } from './config';
import { handleResponse } from './helpers'; // methode qui importe le json

class Training extends React.Component{

  constructor(props) {
    super(props);

    var random_col=[];

    /* fill in random colors .*/
    for (var i=0; i<=this.props.num_training; i++) {
      var tmp = Math.round(Math.random() * 3)+1;
      do {
          tmp = Math.round(Math.random() * 3)+1;;
      } while (random_col[i-1]===tmp); // make sure it changes color every time
      random_col[i] = tmp;
      };

    let chosen = Array(this.props.num_training).fill(0);
    let correct_ans = Array(this.props.num_training).fill(0);
    let reaction_times = Array(this.props.num_training).fill().map(() => Array(2).fill(0));

    this.state = {
      tot_num_app: 3,
      training_bg:["training_1","training_2","training_3","training_4"],
      training_info: {},
      tree_col:random_col,
      trial:0,
      compute_fb:0,
      disp_fb:0,
      chosen:chosen,
      sum_passed:0,
      correct_ans:correct_ans,
      reaction_times: reaction_times,
      TrainingStartTime: [],
      TrainingFinishTime: [],
      };
  }

  render(){

    if (this.state.trial===0) {
      //console.log("Fetch data training")
      this.fetchTraining(this.props.UserNo);
      return null
      }

    var trial_ind = this.state.trial-1;
    var col = this.state.tree_col[trial_ind];

    if (this.state.trial<=this.props.num_training){
      return (
        <div className={this.state.training_bg[col-1]}>
            <div className="training_text">
              <p>
                Look at the  apples previously collected <br />
                (on the wooden crate). Which apple is most <br />
                likely to be picked next ? <br />
                Remember: a tree always produces apples <br />
                of similar sizes !
              </p>
              <p> &emsp; &emsp; &emsp; Press 1&emsp; &emsp; Press 2</p>
              {this.disp_boxes(col)}
              <div className="suggestions">
                {this.disp_suggestions(col)}
                {this.compute_fb()}
                {this.disp_fb()}
                {this.listenner()}
              </div>
            </div>
        </div>
        );
      }

      else {
        document.removeEventListener("keydown", this._handleKeyDownEnter)
        var percentage_passed = this.state.sum_passed / this.props.num_training;
        this.sendTraining(this.props.UserNo);
        this.props.nextTransition(percentage_passed);
        return null
      }
    }

  renderApple(val, col){
    return <AppleTraining value={val} col={col}/>;
  }

  renderAppleSug(val, col){
    return <AppleSug value={val} col={col}/>;
  }

  disp_boxes(col) {

      let all_boxes = [];
      var trial_ind = this.state.trial - 1;
      var apples = this.state.training_info.InitialSamplesSize[trial_ind];

      for (var i=0; i<apples.length; i++) {
        all_boxes[i]=this.renderApple(apples[i],col)
      }

    return all_boxes;
  }

  disp_suggestions(col) {

      let all_sugg=[];
      var trial_ind = this.state.trial - 1;
      var apples_suggested = this.state.training_info.ChoicesSize[trial_ind];

      for (var i=0; i<2; i++) {
        all_sugg[i]=this.renderAppleSug(apples_suggested[i],col)
      }

    return all_sugg;
  }

  disp_fb() {

    var trial_ind = this.state.trial-1;

    if (this.state.disp_fb===1){
      return <Feedback chosen={this.state.chosen[trial_ind]} correct_ans={this.state.correct_ans[trial_ind]}/>
    }
  }

  compute_fb() {

    if (this.state.compute_fb===1) {

      let trial_ind = this.state.trial - 1;
      let ChoicesCorrect = this.state.training_info.ChoicesCorrect[trial_ind];
      let sum_passed = this.state.sum_passed;
      let correct_ans = this.state.correct_ans;
      let chosen = this.state.chosen;

      if ((ChoicesCorrect[0]-ChoicesCorrect[1]) < 0){
        correct_ans[trial_ind] = 2;
      }
      else {
        correct_ans[trial_ind] = 1;
      }

      if (chosen[trial_ind]===correct_ans[trial_ind]) {
        sum_passed++
      }

      this.setState({
          sum_passed: sum_passed,
          disp_fb:1,
          compute_fb: 0,
          correct_ans: correct_ans,
        });
    }
  }

  fetchTraining(user_no_){

    var currentDate   = new Date();
    var TrainingStartTime    = currentDate.toTimeString();

    var reaction_times = this.state.reaction_times;

    fetch(`${API_URL}/training/`+user_no_)
    .then(handleResponse)
    .then((data) => {

        const training_info = {
          TrialNo             : data.TrialNo,
          ChoicesSize         : data.ChoicesSize,
          ChoicesCorrect      : data.ChoicesCorrect,
          InitialSamplesSize  : data.InitialSamplesSize,
        }

        reaction_times[0][0] = Math.round(performance.now());

        this.setState({
          training_info: training_info,
          trial: 1,
          reaction_times: reaction_times,
          TrainingStartTime: TrainingStartTime,
        });
      })
  }

  sendTraining(user_no_){

    var currentDate   = new Date();
    var TrainingFinishTime    = currentDate.toTimeString();

    var TrainingStartTime = this.state.TrainingStartTime;
    var SumPassed = this.state.sum_passed;
    var NumTraining = this.props.num_training;
    var Chosen = this.state.chosen;
    var CorrectAns = this.state.correct_ans;
    var ReactionTimes = this.state.reaction_times;
    var ChoicesSize = this.state.training_info.ChoicesSize.slice(0,NumTraining);
    var ChoicesCorrect = this.state.training_info.ChoicesCorrect.slice(0,NumTraining);
    var InitialSamplesSize = this.state.training_info.InitialSamplesSize.slice(0,NumTraining);

    let training_behaviour = {  'SumPassed'           : SumPassed,
                                'TrainingStartTime'   : TrainingStartTime,
                                'TrainingFinishTime'  : TrainingFinishTime,
                                'ChoicesSize'         : ChoicesSize,
                                'ChoicesCorrect'      : ChoicesCorrect,
                                'InitialSamplesSize'  : InitialSamplesSize,
                                'Chosen'              : Chosen,
                                'CorrectAns'          : CorrectAns,
                                'ReactionTimes'       : ReactionTimes,
                                'NumTraining'         : NumTraining}

    console.log("sendTraining", "training_behaviour", JSON.stringify(training_behaviour))

    fetch(`${API_URL}/training_behaviour/` + user_no_, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(training_behaviour)
     })
  }

  changeState(key_pressed, time_pressed){

    var chosen = this.state.chosen;
    var trial_ind = this.state.trial - 1;
    var reaction_times = this.state.reaction_times;

    reaction_times[trial_ind][1] = time_pressed;

    if (this.state.trial < this.props.num_training){
      reaction_times[trial_ind+1][0] = time_pressed+500;
    }

    chosen[trial_ind] = key_pressed;

    this.setState({
      chosen: chosen,
      compute_fb: 1,
    });
  }

  listenner(){

    document.removeEventListener("keydown", this._handleKeyDownEnter)
    document.removeEventListener("keydown", this._handleKeyDownNumbers)

    if (this.state.disp_fb===0){
      return document.addEventListener("keydown", this._handleKeyDownNumbers);
        }

    else {

      var trial = this.state.trial;
      trial++

      setTimeout(
        function() {
          this.setState({
            disp_fb: 0,
            trial: trial,
            });
          }
          .bind(this),
          500
        );
      }
  }

  _handleKeyDownNumbers = (event) => {

    var time_pressed;

    switch( event.keyCode ) {
        case 97:
        time_pressed = Math.round(performance.now());
        this.changeState(1, time_pressed)
            break;
        case 98:
        time_pressed = Math.round(performance.now());
        this.changeState(2, time_pressed)
            break;
        case 49:
        time_pressed = Math.round(performance.now());
        this.changeState(1, time_pressed)
            break;
        case 50:
        time_pressed = Math.round(performance.now());
        this.changeState(2, time_pressed)
            break;
        default:
      }
  }
};



export default Training;
