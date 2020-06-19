import React from 'react';
import './style/slides.css';
import { API_URL } from './config';
import Image from 'react-image-resizer';

class Questions extends React.Component{

  constructor(props) {
    super(props);

    let pressed_keys = Array(this.props.questions_nb).fill(0);
    let correct = Array(this.props.questions_nb).fill(0);
    let reaction_times = Array(this.props.questions_nb+1).fill(0);

    var currentDate   = new Date();
    var QuestionsStartTime    = currentDate.toTimeString();

    this.state = {
      question_no: 0,
      sum_passed: 0,
      pressed_keys: pressed_keys,
      correct: correct,
      reaction_times: reaction_times,
      QuestionsStartTime: QuestionsStartTime,
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

  display_question(question_no){
    switch(question_no) {
      case 1:
        return (
          <div className="slide_text">
            <p>
              Apples picked from the same tree: <br />
              1 - Have the same size <br />
              2 - Have the same colour <br />
              3 - Are next to each other <br />
              4 - Have nothing in common <br />
              [Press the correct key]
            </p>
          </div>
        );

        case 2:
          return (
            <div className="slide_text">
              <p>
                In order to fill the glass of juice, you need to: <br />
                1 - Collect the biggest apples <br />
                2 - Collect the most apples from the same tree <br />
                3 - Collect apples from red trees <br />
                4 - Collect big apples when the sun sets <br />
                [Press the correct key]
              </p>
            </div>
          );

          case 3:
            return (
              <div className="slide_text">
                <p>
                  The type of the glass (big glass or small glass) depends on: <br />
                  1 - The sizes of the apples you collected <br />
                  2 - The colours of the apple you collected <br />
                  3 - Nothing, it is random <br />
                  4 - The number of apples that could be picked <br />
                  [Press the correct key]
                </p>
              </div>
            );

            case 4:
              return (
                <div className="slide_text">
                  <p>
                    At the end of the game, all your juice glasses will be: <br />
                    1 - Useless <br />
                    2 - Converted to a monetary bonus<br />
                    3 - Delivered to your door  <br />
                    4 - Drank by Maggie <br />
                    [Press the correct key]
                  </p>
                </div>
              );

              case 5:
                return (
                  <div className="slide_text">
                    <p>
                      To select which tree you want to pick the next apple from you will use: <br />
                      1 - Your mouse <br />
                      2 - Keys 1, 2, 3 <br />
                      3 - Left, Up, Right arrows <br />
                      4 - Your finger touch <br />
                      [Press the correct key]
                    </p>
                  </div>
                );

             default:

              }
            }

  start_quest(){

    var reaction_times = this.state.reaction_times;
    var time_displayed = Math.round(performance.now());

    reaction_times[0] = time_displayed;

    this.setState({
      question_no: 1,
      reaction_times: reaction_times,
    });
  }

  next_question(pressed, time_pressed){

    var question_no = this.state.question_no;
    var sum_passed = this.state.sum_passed;
    var pressed_keys = this.state.pressed_keys;
    var reaction_times = this.state.reaction_times;
    var correct = this.state.correct;
    var ind_question = question_no - 1;

    if ((question_no === 1 && pressed === 2)||
        (question_no === 2 && pressed === 1)||
        (question_no === 3 && pressed === 4)||
        (question_no === 4 && pressed === 2)||
        (question_no === 5 && pressed === 2)){

        correct[ind_question]=1;
        sum_passed = sum_passed+1;
    }

    pressed_keys[ind_question] = pressed;
    reaction_times[ind_question+1] = time_pressed;

    question_no=question_no+1;

    this.setState({
      question_no: question_no,
      sum_passed: sum_passed,
    });
  }

  render(){

    document.addEventListener("keydown", this._handleKeyDownNumbers)

    if(this.state.question_no===0){
        if (this.state.currentImage===0){
          return (
            <div className="place-middle">
              <div className="slide_im">
                  <Image src={this.props.loading_bg[this.state.currentImage]} height={800}/>
              </div>
            </div>
          );}

        else {
          this.start_quest();
          return null;
      }
    }

    else{
      if (this.state.question_no<=this.props.questions_nb){
        return (
          <div className="place-middle">
            <div className="slide_im">
              <Image src={this.props.questions_bg} height={800}/>
              {this.display_question(this.state.question_no)}
            </div>
          </div>
        );
      }

      else {
        document.removeEventListener("keydown", this._handleKeyDownEnter)
        var percentage_passed = this.state.sum_passed / this.props.questions_nb;
        this.sendQuestions(percentage_passed, this.props.UserNo);
        this.props.nextTransition(percentage_passed);
        return null
      }
    }
  }

  sendQuestions(percentage_passed, user_no_){

    var currentDate   = new Date();
    var QuestionsFinishTime    = currentDate.toTimeString();

    var QuestionsStartTime = this.state.QuestionsStartTime;
    var InstructionsStartTime = this.props.InstructionsStartTime;
    var UserStartTime = this.props.StartTime;

    var SumPassed = this.state.sum_passed;
    var pressed_keys = this.state.pressed_keys;
    var correct = this.state.correct;
    var reaction_times = this.state.reaction_times;

    var prolific_id = this.props.prolific_id;
    var training_no = this.props.training_no;
    var task_no = this.props.task_no;


    let questions_behaviour = {  'SumPassed'             : SumPassed,
                                 'UserStartTime'         : UserStartTime,
                                 'ProlificID'            : prolific_id,
                                 'TrainingNo'            : training_no,
                                 'TaskNo'                : task_no,
                                 'PressedKeys'           : pressed_keys,
                                 'PercentagePassed'      : percentage_passed,
                                 'ReactionTimes'         : reaction_times,
                                 'InstructionsStartTime' : InstructionsStartTime,
                                 'QuestionsStartTime'    : QuestionsStartTime,
                                 'QuestionsFinishTime'   : QuestionsFinishTime,
                                 'Correct'               : correct}

    //console.log("sendQuestions", "questions_behaviour", questions_behaviour)

    fetch(`${API_URL}/questions_behaviour/` + user_no_, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(questions_behaviour)
     })
  }

  _handleKeyDownNumbers = (event) => {

    var pressed;
    var time_pressed;

    switch( event.keyCode ) {
        case 97:
        pressed = 1;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 98:
        pressed = 2;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 99:
        pressed = 3;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 100:
        pressed = 4;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 49:
        pressed = 1;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 50:
        pressed = 2;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 51:
        pressed = 3;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        case 52:
        pressed = 4;
        time_pressed = Math.round(performance.now());
        this.next_question(pressed, time_pressed)
            break;
        default:
      }
  }
};

export default Questions;
