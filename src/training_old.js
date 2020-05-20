import React from 'react';
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
      };
  }

  render(){

    if (this.state.trial===0) {
      console.log("1.fetch data training")
      this.fetchTraining(this.props.UserNo);
      return 0
      }

    var trial_ind = this.state.trial-1;
    var col = this.state.tree_col[trial_ind];

    if (this.state.trial<=this.props.num_training){
      return (
        <div className={this.state.training_bg[col-1]}>
            {this.disp_boxes(col)}
              <div className="suggestions">
                {this.disp_suggestions(col)}
                {this.compute_fb()}
                {this.disp_fb()}
                {this.listenner()}
                </div>
        </div>
        );
      }

      else {
        document.removeEventListener("keydown", this._handleKeyDownEnter)
        var percentage_passed = this.state.sum_passed / this.props.num_training;
        this.sendTraining(this.props.UserNo);
        this.props.nextTransition(percentage_passed);
        return 0
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

    fetch(`${API_URL}/training/`+user_no_)
    .then(handleResponse)
    .then((data) => {

        const training_info = {
          TrialNo             : data.TrialNo,
          ChoicesSize         : data.ChoicesSize,
          ChoicesCorrect      : data.ChoicesCorrect,
          InitialSamplesSize  : data.InitialSamplesSize,
        }

        this.setState({
          training_info: training_info,
          trial: 1,
        });
      })
  }

  sendTraining(user_no_){

    var SumPassed = this.state.sum_passed;
    var NumTraining = this.props.num_training;
    var Chosen = this.state.chosen;
    var CorrectAns = this.state.correct_ans;
    var ChoicesSize = this.state.training_info.ChoicesSize.slice(0,NumTraining);
    var ChoicesCorrect = this.state.training_info.ChoicesCorrect.slice(0,NumTraining);
    var InitialSamplesSize = this.state.training_info.InitialSamplesSize.slice(0,NumTraining);

    let training_behaviour = {  'SumPassed'           : SumPassed,
                                'ChoicesSize'         : ChoicesSize,
                                'ChoicesCorrect'      : ChoicesCorrect,
                                'InitialSamplesSize'  : InitialSamplesSize,
                                'Chosen'              : Chosen,
                                'CorrectAns'          : CorrectAns,
                                'NumTraining'         : NumTraining}

    console.log("sendTraining", "training_behaviour", training_behaviour)

    fetch(`${API_URL}/training_behaviour/` + user_no_, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(training_behaviour)
     })
  }

  listenner(){

    document.removeEventListener("keydown", this._handleKeyDownEnter)
    document.removeEventListener("keydown", this._handleKeyDownNumbers)

    if (this.state.disp_fb===0){
      console.log("listenning to number")
      return document.addEventListener("keydown", this._handleKeyDownNumbers);
        }
    else {
      console.log("listenning to enter")
      return document.addEventListener("keydown", this._handleKeyDownEnter);
        }
  }

  _handleKeyDownNumbers = (event) => {

    var chosen = this.state.chosen;
    var trial_ind = this.state.trial - 1;

    switch( event.keyCode ) {
        case 97:
        chosen[trial_ind] = 1;
            this.setState({
              chosen: chosen,
              compute_fb: 1,
            });
            break;
        case 98:
        chosen[trial_ind] = 2;
            this.setState({
              chosen: chosen,
              compute_fb: 1,
            });
            break;
        case 49:
        chosen[trial_ind] = 1;
            this.setState({
              chosen: chosen,
              compute_fb: 1,
            });
            break;
        case 50:
        chosen[trial_ind] = 2;
            this.setState({
              chosen: chosen,
              compute_fb: 1,
            });
            break;
        default:
      }
  }

  _handleKeyDownEnter = (event) => {
    switch( event.keyCode ) {
        case 13:

          var trial = this.state.trial;
          trial++

          this.setState({
            disp_fb: 0,
            trial: trial,
          });

          break;

        default:
      }
  }

};



export default Training;
