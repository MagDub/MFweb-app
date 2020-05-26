import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../QuizQuestion/Question';
import AnswerOption from '../QuizQuestion/AnswerOption';
import ProgressBar from '../QuizQuestion/ProgressBar';


function Quiz(props) {

  // console.log(props.image) 
  // console.log(props.image_a) 
  
  
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key             ={key.content}
        answerContent   ={key.content}
        answerType      ={key.type}
        answer          ={props.answer}
        questionId      ={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  if (props.image!=null){ 

    if (props.image_a!=null) { // both question and answer images are available 

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
      <center>
      <p><span className='bold'>Part {props.survey_part} of {props.surveyTotal}</span></p>
        <ProgressBar counter={props.questionCount} total={props.questionTotal}/>
        <br></br>
        <Question content={props.question} />
        <div className="symbolframe">    
          <img className="quizImage" src={props.image} alt='quizImage'/> 
        </div>
        <p></p>
        <div className="symbolframe">    
          <img className="quizImage" src={props.image_a} alt='quizImage'/> 
        </div>
        </center>
      
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </CSSTransitionGroup>);
}

  else {
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
        <center>
        <p><span className='bold'>Part {props.survey_part} of {props.surveyTotal}</span></p>
        <ProgressBar counter={props.questionCount} total={props.questionTotal}/>
        <br></br>
        <Question content={props.question} />
        <div className="symbolframe">    
          <img className="quizImage" src={props.image} alt='quizImage'/> 
        </div>
        <p></p>
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        </center>
      </div>
    </CSSTransitionGroup>);
  } 
}

else if (props.image===null) {

  if (props.image_a!=null) {

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
        <center>
        <p><span className='bold'>Part {props.survey_part} of {props.surveyTotal}</span></p>
        <ProgressBar counter={props.questionCount} total={props.questionTotal}/>
        <br></br>
        <Question content={props.question} />
        <div className="symbolframe">    
          <img className="quizImage" src={props.image_a} alt='quizImage'/> 
        </div>
        </center>
        <p></p>
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </CSSTransitionGroup>);
  }
  else {

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
      <center>
      <p><span className='bold'>Part {props.survey_part} of {props.surveyTotal}</span></p>
        <ProgressBar counter={props.questionCount} total={props.questionTotal}/>
        <br></br>
        <Question content={props.question}/>
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        </center>
      </div>
    </CSSTransitionGroup>);

  }
}

}

Quiz.propTypes = {
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

export default Quiz;
