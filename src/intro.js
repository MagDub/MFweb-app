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
import { API_URL } from './config';
import { handleResponse } from './helpers'; // imports json


class Consent extends Component {

  constructor(props) {
    super(props);

    var currentDate   = new Date();
    var date          = currentDate.getDate();
    var month         = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year          = currentDate.getFullYear();
    var dateString    = date + "-" +(month + 1) + "-" + year;
    var timeString    = currentDate.toTimeString();

    this.state = {
      UserNo: [],
      ConsentCompleted: 0,
      date: dateString,
      startTime: timeString,
    };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent(survey) {

    this.setState({
      ConsentCompleted: 1,
    });
  }

  componentDidMount() {
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    this.fetchUserInfo();
  }

  fetchUserInfo () {
       fetch(`${API_URL}/questions_behaviour/last_user_no`)
         .then(handleResponse)
         .then((data) => {
           const user_no_ = parseInt(data['new_user_no'])
           //console.log("fetchUserInfo in Intro ", "user_no", user_no_)

           this.setState({
                   UserNo : user_no_,
               });
       })
         .catch((error) => {
          console.log(error)
       });
      }

  render() {

    var json = { title: "Form", pages: [

      {questions: [

        { type: "html",
           name: "info",
           html: ""},

         { type: "html",
            name: "info",
            html: "<h6>Who is conducting this research study?</h6>"},

        { type: "html",
           name: "info",
           html: "<p>This research is being conducted by the Wellcome Centre for Human Neuroimaging and the Max Planck UCL Centre for Computational Psychiatry and Ageing Research.The lead researchers for this project are Magda Dubois (magda.dubois.18@ucl.ac.uk) and Dr. Tobias Hauser (t.hauser@ucl.ac.uk).This study has been approved by the UCL Research Ethics Committee (project ID number 15301&#92;001) and funded by the Wellcome Trust.</p>"},

        { type: "html",
            name: "info",
            html: "<h6>What is the purpose of this study?</h6>"},

        { type: "html",
           name: "info",
           html: "<p> We are interested in how the adult brain controls learning and decision-making. This research aims to provide insights into how the healthy brain works to help us understand the causes of a number of different medical conditions.</p>"},

        { type: "html",
            name: "info",
            html: "<h6>Who can participate in the study?</h6>"},

        { type: "html",
           name: "info",
           html: "<p> Adults (aged 18 years or over). </p>"},

        { type: "html",
            name: "info",
            html: "<h6>What will happen to me if I take part?</h6>"},

        { type: "html",
           name: "info",
           html: "<p> You will play one or more online computer games, which will last around approximately 1 hour. You will receive between 8.25 and 12 GBP per hour for helping us. The amount could vary based on the decisions you make in the game. You will also be asked some questions about yourself, your feelings, background, attitudes and behaviour in your everyday life. There will also be some questions about reasoning. Remember, you are free to withdraw at any time without giving a reason.</p>"},

       { type: "html",
           name: "info",
           html: "<h6>What are the possible disadvantages and risks of taking part?</h6>"},

       { type: "html",
          name: "info",
          html: "<p> The task you complete does not pose any known risks. You will be asked to answer some questions about mood and feelings, and we will provide information about ways to seek help should you feel affected by the issues raised by these questions.</p>"},

       { type: "html",
           name: "info",
           html: "<h6>What are the possible benefits of taking part?</h6>"},

       { type: "html",
          name: "info",
          html: "<p> While there are no immediate benefits to taking part, your participation in this research will help us understand how people make decisions and this could have benefits for our understanding of mental health problems. </p>"},

      { type: "html",
          name: "info",
          html: "<h6>Complaints</h6>"},

      { type: "html",
         name: "info",
         html: "<p> If you wish to complain or have any concerns about any aspect of the way you have been approached or treated by members of staff, then the research UCL complaints mechanisms are available to you. In the first instance, please talk to the researcher or the chief investigator (Dr Tobias Hauser, t.hauser@ucl.ac.uk) about your complaint. If you feel that the complaint has not been resolved satisfactorily, please contact the chair of the UCL Research Ethics Committee (ethics@ucl.ac.uk). If you are concerned about how your personal data are being processed please contact the data controller who is UCL: data-protection@ucl.ac.uk. If you remain unsatisfied, you may wish to contact the Information Commissioner’s Office (ICO). Contact details, and details of data subject rights, are available on the ICO website at: https://ico.org.uk/for-organisations/data-protection-reform/overview-of-the-gdpr/individuals-rights. </p>"},

      { type: "html",
          name: "info",
          html: "<h6>What about my data?</h6>"},

      { type: "html",
          name: "info",
          html: "<p> To help future research and make the best use of the research data you have given us (such as answers to questionnaires) we may keep your research data indefinitely and share these. The data we collect will be shared and held as follows:<ul><li> In publications, your data will be anonymised, so you cannot be identified. </li><li> In public databases, your data will be anonymised. </li><li> We do not collect any personal data that could be used to identify you. </li></ul> The legal basis used to process your personal data will be the provision of public task (this means that the research you are taking part in is deemed to be in the public interest). The legal basis used to process special category data (i.e. ethnicity) will be for scientific research purposes. We will follow the UCL and legal guidelines to safeguard your data. If you change your mind and withdraw your consent to participate in this study you can contact us via Prolific. However, we collect all data in an anonymised form, which is why this data cannot be destroyed, withdrawn or recalled.If there are any queries or concerns please do not hesitate to contact: Magda Dubois, magda.dubois.18@ucl.ac.uk.</p>"},
    ]},

    {questions: [

        { type: "checkbox", name: "checkbox1",
            title: "I have read the information above, and understand what the study involves.",
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox2",
            title: "I consent to the processing of my personal information (e.g. User Id) for the purposes of this research study. I understand that such information will remain confidential and will be handled in accordance with all applicable data protection legislation and ethical standards in research. These data will only be accessible to the study team and individuals from the University and Funder who are responsible for monitoring and audits.",
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox3",
            title: 'I consent to being re-contacted for the purposes of this research study.',
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox4",
            title: 'I understand that my anonymised personal data can be shared with others for future research, shared in public databases and in scientific reports.',
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox5",
            title: 'I understand that I am free to withdraw from this study at any time without giving a reason and this will not affect my future medical care or legal rights.',
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox6",
            title: 'I understand the potential benefits and risks of participating, the support available to me should I become distressed during the research, and who to contact if I wish to lodge a complaint.',
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox7",
            title: 'I understand the inclusion and exclusion criteria in the Information Sheet and as explained to me by the researcher.  I confirm that I do not fall under the exclusion criteria.',
            isRequired: true,
            choices: ["Yes"]},

        { type: "checkbox", name: "checkbox8",
            title: 'I agree that the research project named above has been explained to me to my satisfaction and I agree to take part in this study.',
            isRequired: true,
            choices: ["Yes"]},
        ]}
  ]};

    if(this.state.ConsentCompleted===0){
      return(
      <div>
        <div className="IntroConsentText">
          <p><span className="bold">INFORMATION FOR THE PARTICIPANT</span></p>
          Please read carefully. If you are happy to proceed please click the boxes on the 2nd page of the form to show that
          you consent to this study proceeding. Please note that you cannot proceed to the study unless
          you give your full consent.
          <br/><br/>
          <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent}/>
        </div>
      </div>
      );
    }
    else {

      this.props.history.push({
        pathname: `/Task`,
        state: {user_info: this.state}
      })

      return null
    }
  }
}

export default Consent;
