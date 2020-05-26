import React from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

// import other questionnaires the same way
import * as demo  from './questionnaires/DEMO';
import * as pad from './questionnaires/PADWSUR';
import * as hads from './questionnaires/HADS';
import * as pss from './questionnaires/PSS';
import * as pswq from './questionnaires/PSWQ';
import * as ius from './questionnaires/IUS';
import * as bis from './questionnaires/BIS11';
// import * as feedback from '../../questionnaires/FEEDBACK';
import * as iq from './questionnaires/IQ';


var quizData = {
  pad: pad,
  hads: hads,
  pss: pss,
  pswq: pswq,
  bis: bis,
  ius: ius,
  demo: demo,
  iq:iq
}


function createQuiz(id,survey_name) {
     return {
         id: id,
         surveytag: survey_name,
         quizQuestions: quizData[survey_name]
     };
 }


// var list = [];
//  for(var i = 0; i < n; i++) {
//     var obj = createQuiz(i,survey_list[i]); //add other params if you need
//     list.push(obj);
//  }
//  console.log(list);


class Survey extends React.Component {
  constructor(props){
    super(props);

    // Information about a specific block of the Survey:
    const block_info = {
      surveytag  : this.props.location.state.participant_info.survey_list[0], // First questionnaire in the list
     }

    this.state = {
      participant_info : this.props.location.state.participant_info,
      block_info       : block_info,
      newblock_frame   : this.props.location.state.newblock_frame,
      questions        : quizData[this.props.location.state.participant_info.survey_list[0]].default,
      finished         : false,
    }


    this.getSurveyBlock.bind(this);
    this.redirectToQuiz.bind(this);
    this.redirectToEnd.bind(this); // TO BE CHANGED
    this._isMounted = false;
    this._handleGoBack.bind(this);
    this._handleTimeOut.bind(this);
  }


  redirectToQuiz () {
      if((this.props.location.state.participant_info.block_number <= (this.props.location.state.participant_info.TotalBlock)))
          {
          if (this.state.newblock_frame){ // TRUE
          this.setState({newblock_frame : false})

          // console.log(this.state.newblock_frame)
          this.props.history.push({
           pathname: `/QuizBlock`,
           state: {participant_info: this.state.participant_info,
                   block_info      : this.state.block_info,
                   questions       : this.state.questions,
                 }
          })}
          else // FALSE
          {
            if (this._isMounted)
            {

              // console.log('Block number',this.props.location.state.participant_info.block_number)

              if (this.props.location.state.participant_info.block_number===this.props.location.state.participant_info.TotalBlock){ // just finished the LAST BLOCK

                // redirect to the final
                this.setState({finished: true})

              }
              else if (this.props.location.state.participant_info.block_number<this.props.location.state.participant_info.TotalBlock){ // just finished the LAST BLOCK

              const newblocknumber = this.props.location.state.participant_info.block_number + 1
              // console.log(newblocknumber)
              this.getSurveyBlock(newblocknumber,this.props.location.state.participant_info.survey_list)
              this.setState({newblock_frame: true, participant_info : {...this.state.participant_info, block_number:newblocknumber},})
              }

            }
          }
        }
      }

  componentDidMount() {
  this._isMounted = true;
  document.body.style.background= '#fff';
  // this._isMounted && this.getSurveyBlock(this.props.location.state.participant_info.block_number,this.props.location.state.participant_info.survey_list);
    window.history.pushState(window.state, null, window.location.href);
    window.addEventListener('popstate', e => this._handleGoBack(e));
    window.onbeforeunload = this._handleRefresh

  }

  componentWillUnmount() {
    clearTimeout(this._handleTimeOut);
  }

  _handleRefresh(evt){
    return false // error message when refresh occurs
  }

  _handleGoBack(event){
    window.history.go(1);
  }

  componentWillUnmount()
  {
   this._isMounted = false;
  }

  _handleTimeOut() {
    setTimeout(() => {
     this.redirectToQuiz()
    }, 1500);
}

 // Get info about the specific Survey Block:
 getSurveyBlock(block_number_,survey_list_) {

    // console.log('Block Number Get Survey Block:',block_number_+1)

    const surveytag_block = survey_list_[block_number_]
    // console.log('SurveyTag Block:',surveytag_block)

    this.setState({ loading: true , questions: quizData[survey_list_[block_number_]].default, block_info : {...this.state.block_info, surveytag:surveytag_block}});

}

 redirectToEnd(){
    // redirect either to the TASK or to the validation page depeneding on the task status
    if (this.props.location.state.participant_info.task = true) {
      alert("You will now be redirected to the experimental game. Please, confirm leaving the page. Thank you!")

      this.props.history.push({
        pathname: `/Task`,
        state: {participant_info: this.state}
      })

      // create a flexible link including prolific id, study id longit and participant ids and redirect to the external
      // window.location = 'http://localhost:5000/exp?prolific_id='+this.props.location.state.participant_info.prolific_id + '&participant_id=' + this.props.location.state.participant_info.participant_id + '&study_id=' + this.props.location.state.participant_info.study_id + '&longit_id=' + this.props.location.state.participant_info.longit_id
      //window.location = 'https://udecmac.osc-fr1.scalingo.io/exp?prolific_id='+this.props.location.state.participant_info.prolific_id + '&participant_id=' + this.props.location.state.participant_info.participant_id + '&study_id=' + this.props.location.state.participant_info.study_id + '&longit_id=' + this.props.location.state.participant_info.longit_id

    }
    else {

      alert("You will now be redirected to the validation page. Please, confirm leaving the page. Thank you!")
      // window.location.replace('https://app.prolific.co/submissions/complete?cc=1A496EDB')
      // window.location = 'https://app.prolific.co/submissions/complete?cc=' + this.props.location.state.participant_info.study_id // CHECK if validation code == stidu id
  }
}


render()
  {
    let text
    if ((this.state.block_info.surveytag === this.props.location.state.participant_info.survey_list[0]) && (this.state.newblock_frame))
    {
      text = <div className='SurveyIntroText'> <p>Dear Participant,</p>
      <p>Thank you for taking part in our study!</p>
      <p>The current study investigating decision-making will take about 60 minutes.</p>
      <p>You will be asked to complete several questionnaires and play a decision-making task.</p>
      <p>Please do not start until you will have enough time to complete it in one go.</p>
      <p>Please close other programs (e.g. chat or e-mail) to avoid distractions.</p>

      <p><span className="bold">Good luck!</span></p></div>

    return (
      <div>
      <center>
      <div className="instructionsButtonContainer">
        <div>
          {text}
        </div>
        <center>
          <Button className="buttonInstructionStart" onClick={()=>this.redirectToQuiz()}>
          <span className="bold">START</span>
          </Button>
        </center>
      </div>
      </center>
      </div>);
    }

     else if ((this.state.block_info.surveytag !== this.props.location.state.participant_info.survey_list[0]) && (this.state.newblock_frame))
    {
        return(<div>{this._handleTimeOut()}</div>);
      }

    else if (this.props.location.state.participant_info.block_number === this.props.location.state.participant_info.TotalBlock && this.state.finished===true)
    {
      if (this.props.location.state.participant_info.task===true) {
        text = <div className='SurveyIntroText'> <p><span className="bold">You completed all the questionnaires!</span></p>
              <p>You will now be redirected to the experimental game.</p>
              <p>Please, confirm leaving the page when prompted by the browser.Thank you!</p></div>
      }

      else {
        text = <div className='SurveyIntroText'> <p><span className="bold">You completed all the questionnaires!</span></p>
            <p>You will now be redirected to the validation page.</p>
            <p>Please, confirm leaving the page when prompted by the browser. Thank you!</p></div>
      }

      return (
          <div>
          <center>
          <div className="restarttraining">
              {text}  <div className="translate"/>
          </div>
          <div>
            <Button variant="secondary" color="danger" size="sm" className="buttonInstructionFinal" type="submit" onClick={() => this.redirectToEnd()}>Continue</Button>
          </div>
          </center>
          </div>);
    }

    else
    {
          text = 'Thanks a lot for you input so far, please continue with the next section'
        return (
      <div>
      <center>
      <div className="SurveyIntroText">
        {text}
      </div>
      <center>
            <Button className="buttonInstructionStart" onClick={()=> this.state.finished ? this.redirectToEnd() : this.redirectToQuiz()}>
            &#8594;
            </Button>
            </center>
    </center>
    </div>);
    }
  }

}

export default withRouter(Survey);
