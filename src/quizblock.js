import React from 'react';
import { API_URL } from './config';
import Quiz from './Quiz/Quiz';
import Report from './Report/Report';
import ReportNA from './ReportNA/ReportNA';
import FreeReport from './FreeReport/FreeReport';
import ButtonQuiz from './ButtonQuiz/ButtonQuiz';
import CheckboxQuiz from './CheckboxQuiz/CheckboxQuiz';

class QuizBlock extends React.Component {
  constructor(props) {
    super(props);

    // Get the right questions JSON part
    var quizQuestionsBlock = this.props.location.state.questions.filter(d => d.surveytag === this.props.location.state.block_info.surveytag);

    // console.log(quizQuestionsBlock)

    this.state = {
      counter: 0,
      questionCount: 1, // count across all questions in the questionnaire
      question: '',
      answerOptions: [],
      answer: '',
      qtype: '',      // the type of the question to be asked
      questionId: '', // Question id stored in the JS object, does not have to be consecuitive.
      answersCount: {},
      result: '',
      constraint: [],
      quizQuestionsBlock: quizQuestionsBlock,
      participant_info: this.props.location.state.participant_info,
      image: '', // image question
      image_a: '', // image - answer if available

      // This is to be recorded and POSTED to the DB
      answered_questionsId      : [],
      answered_questionsContent : [],

    };

   this.handleAnswerSelected  = this.handleAnswerSelected.bind(this);
   this.redirectToSurvey      = this.redirectToSurvey.bind(this);

    // console.log(this.state)
  }

  componentDidMount() {
    const firstQuestion = this.state.quizQuestionsBlock[0]
    const image_item    = (this.state.quizQuestionsBlock[0].image=== undefined) ? null : require('./images/' + this.state.quizQuestionsBlock[0].image)
    const image_a       = (this.state.quizQuestionsBlock[0].image_a=== undefined) ? null : require('./images/' + this.state.quizQuestionsBlock[0].image_a)

    var shuffledAnswerOptions = this.state.quizQuestionsBlock.map(question =>this.NoShuffleArray(question.answers));


    document.body.style.background= '#fff';
    this.setState({
      questionId:    firstQuestion.questionId,
      qtype:         firstQuestion.qtype,
      question:      firstQuestion.question,
      answerOptions: shuffledAnswerOptions[0],
      constraint:    firstQuestion.constraint,
      image:         image_item,
      image_a:       image_a,

    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue      = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex]  = temporaryValue;
    }

    return array;
  }

NoShuffleArray(array) {
    var currentIndex = array.length;
    return array;
  }
  // onAnswerSelected points to this function in AnswerOption.js
  handleAnswerSelected(answerContent,questionId,event) {

    this.setUserAnswer(event.currentTarget.value,answerContent,questionId);

    if (this.state.questionCount < this.state.quizQuestionsBlock.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.redirectToSurvey(), 300);
    }
  }

  setUserAnswer(answer,answerContent,questionId) {

    // This is to be recorded and POSTED to the DB
    let answered_questionsId = this.state.answered_questionsId;
      answered_questionsId.push(questionId)

    let answered_questionsContent = this.state.answered_questionsContent;
      answered_questionsContent.push(answerContent)

    this.setState((state, props) => ({
      answer: answer,
      answered_questionsId: answered_questionsId,
      answered_questionsContent: answered_questionsContent,
    }));

  }

  setNextQuestion() {
    const counter       = this.state.counter + 1;
    const questionCount = this.state.questionCount + 1;
    const nextQuestion  = this.state.quizQuestionsBlock[counter]
    const image_item    = (this.state.quizQuestionsBlock[counter].image=== undefined) ? null : require('./images/' + this.state.quizQuestionsBlock[counter].image)
    const image_a       = (this.state.quizQuestionsBlock[counter].image_a=== undefined) ? null : require('./images/' + this.state.quizQuestionsBlock[counter].image_a)


    this.setState({
      counter: counter,
      questionCount: questionCount,
      questionId: nextQuestion.questionId,
      question: nextQuestion.question,
      answerOptions: nextQuestion.answers,
      answer: '',
      qtype: nextQuestion.qtype,
      constraint: nextQuestion.constraint,
      image: image_item,
      image_a: image_a,

    });
  }

  redirectToSurvey ()

  {
    let block_id = this.state.participant_info.block_number+1
    // console.log('Block_number QuizBlock:', this.state.participant_info.block_number)

    if (this.state.participant_info.block_number < this.state.participant_info.TotalBlock) {
      var completed = 'no'}
    else if (this.state.participant_info.block_number === this.state.participant_info.TotalBlock) {
      var completed = 'yes'
    }

    let body     = {        'participant_id'  : this.state.participant_info.participant_id,
                            'prolific_id'     : this.state.participant_info.prolific_id,
                            'longit_id'       : this.state.participant_info.longit_id,
                            'study_id'        : this.state.participant_info.study_id,
                             'date'           : this.state.participant_info.date,
                            'block_number'    : this.state.participant_info.block_number+1,
                            'block_name'      : this.props.location.state.block_info.surveytag,
                            'question_ids'    : this.state.answered_questionsId,
                            'answers'         : this.state.answered_questionsContent,
                            'survey_completed': completed
                          }

  // console.log(body)
  fetch(`${API_URL}/participants_question_data/create/` + this.state.participant_info.participant_id + `/` + block_id + `/` + this.state.participant_info.prolific_id, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body)
     })

  this.props.history.push({
      pathname: `/Survey`,
      state: {participant_info:this.state.participant_info,newblock_frame: false, finished: true}
    })
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    if (this.state.qtype === "quiz")
    {
      return (
        <Quiz
          answer          ={this.state.answer}
          answerOptions   ={this.state.answerOptions}
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          image           ={this.state.image}
          image_a         ={this.state.image_a}

          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}


        />
      );
    }

    else if (this.state.qtype === "report")

    {
      return (
        <Report
          answer          ={this.state.answer}
          answerOptions   ={this.state.answerOptions}
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          constraint      ={this.state.constraint}
          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}

        />
      );
  }

  else if (this.state.qtype === "report-na")
  {

    return (
        <ReportNA
          answer          ={this.state.answer}
          answerOptions   ={this.state.answerOptions}
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          constraint      ={this.state.constraint}
          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}

      />
    );
  }

  else if (this.state.qtype === "free-report")
  {
    return (
        <FreeReport
          answer          ={this.state.answer}
          answerOptions   ={this.state.answerOptions}
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          constraint      ={this.state.constraint}
          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}

      />
    );
  }

  else if (this.state.qtype === "button")
  {
    return (
        <ButtonQuiz
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}

      />
    );
  }

    else if (this.state.qtype === "checkbox")
  {
    return (
        <CheckboxQuiz
          answer          ={this.state.answer}
          answerOptions   ={this.state.answerOptions}
          questionId      ={this.state.questionId}
          questionCount   ={this.state.questionCount}
          question        ={this.state.question}
          questionTotal   ={this.state.quizQuestionsBlock.length}
          onAnswerSelected={this.handleAnswerSelected}
          // Add line for the part of the study: NEW
          survey_part     ={this.state.participant_info.block_number+1}
          surveyTotal     ={this.state.participant_info.TotalBlock+1}
      />
    );
  }
}

  render() {
    return (
      <div className="QuizBlock">
        {this.state.result ? this.redirectToSurvey() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizBlock;

/*
Section header
<div className="QuizBlock-header">
          <h2>{this.state.quizQuestionsBlock[this.state.counter].title}</h2>
        </div>
*/
