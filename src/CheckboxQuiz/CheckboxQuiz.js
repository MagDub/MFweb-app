import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../QuizQuestion/Question';
import Checkbox from '../checkbox';
import ProgressBar from '../QuizQuestion/ProgressBar';



class CheckboxQuiz extends React.Component {

  constructor(props){
    super(props);


  var options = {}
  var answers = {}

// Object.keys(this.props.answerOptions).map(function(key, index) {
//      // options[key] = false; // mybe to change to type
//      options[key.type] = false; // mybe to change to type
//    });

for (var key in this.props.answerOptions) {
  console.log(key)
  options[this.props.answerOptions[key].type] = false // this.props.answerOptions[key].type
  answers[this.props.answerOptions[key].type] = this.props.answerOptions[key].content
}


 this.state = {
    report: '',
    shouldBlockNavigation: false,
    checkboxes: options,
    answers: answers
  }

  this.handleSubmit       = this.handleSubmit.bind(this);
  this.createCheckBox     = this.createCheckBox.bind(this);
} // constructor


componentDidMount() {
  this._isMounted = true;
  document.body.style.background= '#fff';
  this.setState({
    report: '',
    shouldBlockNavigation: false}
    )
  window.history.pushState(window.state, null, window.location.href)
  window.onbeforeunload = null;
  // window.addEventListener("keypress", e => this._handleRefresh(e));

}

_handleGoBack(event){
    window.history.go(1);
  }

handleSubmit(event) {

        // console.log(event)

        event.preventDefault();

        // Check if any of the boxes are checked -> combine the final report and send it to the parent Quiz Block component
        // console.log(this.state.checkboxes)
        const options = this.state.checkboxes
        const answers = this.state.answers

        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
        const count = sumValues(this.state.checkboxes);
        console.log('Number of checked boxes:',count)

        // sub select only answer options that have been checked

        if (count > 0){ // at least one box is checked

        var report = {}
          Object.keys(options).map(function(key, index) {
          if (options[key]===true){
            report[key] = answers[key]
          }
          });

        console.log(report)

          this.props.onAnswerSelected(report,this.props.questionId,event)
          this.setState({
          report: ''})
        }

        else {
          this.setState({
          report: report}
          )
        }
      }


handleCheckboxChange(changeEvent,e) {
  console.log('ChangeEvent',changeEvent)

  this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [changeEvent]: !prevState.checkboxes[changeEvent],
      }
    }));
}


createCheckBox(key) {
    return (
      <Checkbox
        label           ={key.content} // warning using the same keys
        type            ={key.type}
        isSelected      ={this.state.checkboxes[key]}
        onCheckboxChange={(e)=>this.handleCheckboxChange(key.type,e)}
      />
    );
  }


render() {

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={this.props.questionId}>
      <p><span className='bold'>Part {this.props.survey_part} of {this.props.surveyTotal}</span></p>
        <ProgressBar counter={this.props.questionCount} total={this.props.questionTotal}/>
        <br></br>
        <Question content={this.props.question}/>
        <div className="answerOptions">
          {this.props.answerOptions.map(this.createCheckBox)}
        </div>

      </div>
      <p></p>
      <div className="col-md-12 pad-20">
        <div>
          <button type="button" className="btn btn-save btn-primary pad-20" onClick={this.handleSubmit}>
            Submit
          </button>
          </div>
      </div>

    </CSSTransitionGroup>
  );
}

} // closing class


CheckboxQuiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  survey_part: PropTypes.number.isRequired,
  surveyTotal: PropTypes.number.isRequired

};

export default CheckboxQuiz;
