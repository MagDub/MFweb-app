import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../QuizQuestion/Question';
import { Button } from 'react-bootstrap';
import ProgressBar from '../QuizQuestion/ProgressBar';



function ButtonQuiz(props) {

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
      <div key={props.questionCount}>
      <p><span className='bold'>Part {props.survey_part} of {props.surveyTotal}</span></p>
        <Question content={props.question} />
      </div>
      <center>
        <Button className="buttonInstructionStart" onClick={(event)=>props.onAnswerSelected('nan',props.questionId,event)}>CONTINUE</Button>
      </center>
    </CSSTransitionGroup>
  );
}

ButtonQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  survey_part: PropTypes.number.isRequired,
  surveyTotal: PropTypes.number.isRequired

};

export default ButtonQuiz;
