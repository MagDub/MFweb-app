import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css'
import './style/questionnaires.css';
import 'react-showdown';
import './style/intro.css';



class Consent extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isCompleted: 0,
      resultAsString: {}
    };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent(survey) {

    var resultAsString = JSON.stringify(survey.data);

    this.setState({
      isCompleted: 1,
      resultAsString: resultAsString
    });
  }

  componentDidMount() {
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  }

  render() {

    var json = { title: "Consent form", pages: [

      {questions: [
        //  { type: "html",
        //    name: "info",
        //    html: "</br><h5>If you are happy to proceed please read the statement below and click the boxes to show that you consent to this study proceeding.</h5></br>"},

          { type: "checkbox", name: "checkbox1",
              title: "I have read the information above, and understand what the study involves.",
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox2",
              title: "I consent to the processing of my personal information (e.g. User Id) for the purposes of this research study. I understand that such information will remain confidential and will be handled in accordance with all applicable data protection legislation and ethical standards in research. These data will only be accessible to the study team and individuals from the University and Funder who are responsible for monitoring and audits.",
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox3",
              title: 'I consent to being re-contacted for the purposes of this research study.',
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox4",
              title: 'I understand that my anonymised personal data can be shared with others for future research, shared in public databases and in scientific reports.',
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox5",
              title: 'I understand that I am free to withdraw from this study at any time without giving a reason and this will not affect my future medical care or legal rights.',
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox6",
              title: 'I understand the potential benefits and risks of participating, the support available to me should I become distressed during the research, and who to contact if I wish to lodge a complaint.',
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox7",
              title: 'I understand the inclusion and exclusion criteria in the Information Sheet and as explained to me by the researcher.  I confirm that I do not fall under the exclusion criteria.',
              //isRequired: true,
              choices: ["Yes"]},

          { type: "checkbox", name: "checkbox8",
              title: 'I agree that the research project named above has been explained to me to my satisfaction and I agree to take part in this study.',
              //isRequired: true,
              choices: ["Yes"]},
          ]}
    ]};

    if(this.state.isCompleted===0){
      return(
      <div>
        <div className="IntroConsentText">
          <p><span className="bold">PARTICIPANT&#39;S CONSENT</span></p>
          If you are happy to proceed please read the form below and click the boxes to show that
          you consent to this study proceeding. Please note that you cannot proceed to the study unless
          you give your full consent.
          <br/><br/>
          <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent}/>
        </div>
      </div>
      );
    }
    else {
      console.log("JSON string",this.state.resultAsString);

      this.props.history.push({
        pathname: `/Questionnaires`,
        //state: {participant_info: this.props.location.state.participant_info, newblock_frame: true} // to be changed
      })

      return null
    }
  }
}

export default Consent;
