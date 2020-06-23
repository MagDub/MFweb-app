import React from 'react';
import AppleTraining from './appleTraining';
import AppleSug from './appleSug';
import Feedback from './feedback.js';
import { API_URL } from './config';
import { handleResponse } from './helpers'; // methode qui importe le json
import Image from 'react-image-resizer';
import './style/training.css';

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
      currentImage: 0,
      };

      this.switchImage = this.switchImage.bind(this);
  }

  switchImage() {
    this.setState({
      currentImage: 1
    });
  }

  componentDidMount() {
    setTimeout(this.switchImage, 1000);
  }

  render(){

    if (this.state.trial===0) {

      if (this.state.currentImage===0){
        return (
          <div className="place-middle">
            <div className="slide_im">
                <Image src={this.props.loading_bg[this.state.currentImage]} height={800}/>
            </div>
          </div>
        );}

        else
          //console.log("Fetch data training")
          this.fetchTraining(this.props.UserNo);
          return null
      }

    var trial_ind = this.state.trial-1;
    var col = this.state.tree_col[trial_ind];

    if (this.state.trial<=this.props.num_training){
      return (
        <div className="place-middle">
          <div className="slide_im">
            <Image src={this.props.training_bg[col-1]} height={800}/>
              {this.bubble_text(col)}
          </div>
        </div>
        );
      }

      else {
        document.removeEventListener("keyup", this._handlekeyupEnter)
        var percentage_passed = this.state.sum_passed / this.props.num_training;
        this.sendTraining(this.props.UserNo);
        this.props.nextTransition(percentage_passed);
        return null
      }
    }

  bubble_text(col){
    return (
      <div className="training_text">
        <p>
          Look at the  apples previously collected <br />
          (on the wooden crate). Which apple is most <br />
          likely to come from the same tree? <br />
          Remember: a tree always produces apples <br />
          of similar sizes !
        </p>
        <p> &emsp; &emsp; &emsp; &emsp; &emsp; Press 1&emsp; Press 2</p>
        {this.disp_boxes(col)}
        <div className="suggestions">
          {this.disp_suggestions(col)}
          {this.compute_fb()}
          {this.disp_fb()}
          {this.listenner()}
        </div>
      </div>);
    }

  renderApple(val, col){
    return <AppleTraining value={val} col={col} training_apple_col={this.props.training_apple_col}/>;
  }

  renderAppleSug(val, col){
    return <AppleSug value={val} col={col} training_apple_col={this.props.training_apple_col}/>;
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
      return <Feedback images_fb={this.props.images_fb} chosen={this.state.chosen[trial_ind]} correct_ans={this.state.correct_ans[trial_ind]}/>
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

    var training_no = this.props.training_no;
    var reaction_times = this.state.reaction_times;

    fetch(`${API_URL}/training/`+training_no)
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
    var StartTime= this.props.StartTime;
    var SumPassed = this.state.sum_passed;
    var NumTraining = this.props.num_training;
    var Chosen = this.state.chosen;
    var CorrectAns = this.state.correct_ans;
    var ReactionTimes = this.state.reaction_times;
    var ChoicesSize = this.state.training_info.ChoicesSize.slice(0,NumTraining);
    var ChoicesCorrect = this.state.training_info.ChoicesCorrect.slice(0,NumTraining);
    var InitialSamplesSize = this.state.training_info.InitialSamplesSize.slice(0,NumTraining);
    var prolific_id = this.props.prolific_id;
    var training_no = this.props.training_no;
    var task_no = this.props.task_no;

    let training_behaviour = {  'SumPassed'           : SumPassed,
                                'UserStartTime'       : StartTime,
                                'ProlificID'          : prolific_id,
                                'TrainingNo'          : training_no,
                                'TaskNo'              : task_no,
                                'TrainingStartTime'   : TrainingStartTime,
                                'TrainingFinishTime'  : TrainingFinishTime,
                                'ChoicesSize'         : ChoicesSize,
                                'ChoicesCorrect'      : ChoicesCorrect,
                                'InitialSamplesSize'  : InitialSamplesSize,
                                'Chosen'              : Chosen,
                                'CorrectAns'          : CorrectAns,
                                'ReactionTimes'       : ReactionTimes,
                                'NumTraining'         : NumTraining}

    //console.log("sendTraining", "training_behaviour", JSON.stringify(training_behaviour))

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

    document.removeEventListener("keyup", this._handlekeyupEnter)
    document.removeEventListener("keyup", this._handlekeyupNumbers)

    if (this.state.disp_fb===0){
      return document.addEventListener("keyup", this._handlekeyupNumbers);
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

  _handlekeyupNumbers = (event) => {

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
