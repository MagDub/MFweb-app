import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../QuizQuestion/Question';
import ProgressBar from '../QuizQuestion/ProgressBar';
import AnswerOption from '../QuizQuestion/AnswerOption';


class ReportNA extends React.Component {

  constructor(props){
    super(props);

  this.state = {
    report: '',
    answer: '',
    answercheck: false

  }
  // console.log(this.state) // initial states

  this.handleSubmit        = this.handleSubmit.bind(this);
  this.handleChangeReport  = this.handleChangeReport.bind(this);
  this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
  this._handleRefresh      = this._handleRefresh.bind(this);

}


componentDidMount() {
  this._isMounted = true;
  // document.getElementById("create-course-form").reset();
  document.body.style.background= '#fff';
  this.setState({
    report: '',
    answer: '',
    answercheck: false,
    shouldBlockNavigation: false}
    )
  window.history.pushState(window.state, null, window.location.href);
  window.onbeforeunload = null;
  window.addEventListener("keypress", e => this._handleRefresh(e));

}

_handleRefresh(e){
  if (e.key==='Enter') {
  console.log('enter e', e.srcElement);

  // console.log('value', e.target.value);

  var test = this.state.report
  // console.log('test',this.state.report)

  if ((test!=="") && (test!==null) && (test>parseInt(this.props.constraint[0].min)) && (test<parseInt(this.props.constraint[1].max)))
  {
    this.setState({
    answercheck: true}
    );

    console.log(this.state.answercheck)
    // Send answers to the parent component
    // document.getElementById("create-course-form").reset();
    let prev_report = this.state.report
        this.setState({
          report: ''}
        )

        this.props.onAnswerSelected(this.state.report,this.props.questionId,e)
  }
  else {
    e.preventDefault()
  }

  }
}

  handleChangeReport(event) {

  var test = Number(event.target.value)

  this.setState({
    report: event.target.value,
    answercheck: false
    }
    );

  // console.log(Number(test))

  if ((test!=="") && (test!==null) && (test>parseInt(this.props.constraint[0].min)) && (test<parseInt(this.props.constraint[1].max))) {
    this.setState({
    answercheck: true }
    );
    // console.log(this.state.answer)
  }

}

  handleSubmit(event) {
        event.preventDefault();
        this.props.onAnswerSelected(this.state.report,this.props.questionId,event)

  }

  renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={this.props.answer}
        questionId={this.props.questionId}
        onAnswerSelected={this.props.onAnswerSelected}
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
        <Question content={this.props.question} />
        <div className="col-md-6 no-padding">
        <input value={this.state.report} onKeyDown={this._handleRefresh} onChange={this.handleChangeReport} name="report" id="report" className="form-control" placeholder="" type="number" pattern="[0-9]*" inputMode="numeric" required />
        </div>
        <p></p>
        </div>
      <p></p>
      <div className="col-md-12 pad-20">
        <div>
          <button type="submit" className="btn btn-save btn-primary pad-20" disabled={!this.state.answercheck} onClick={this.handleSubmit}>Submit
            </button>
          </div>
      </div>
      <p></p>
      <div className="row">
        <ul className="answerOptions">
          {this.props.answerOptions.map(this.renderAnswerOptions)}
        </ul>
      </div>

    </CSSTransitionGroup>
  );
}
}

ReportNA.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  constraint: PropTypes.array.isRequired,
  participant_info:PropTypes.object.isRequired,
  survey_part: PropTypes.number.isRequired,
  surveyTotal: PropTypes.number.isRequired

};


export default withRouter(ReportNA);
