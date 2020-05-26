import React from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { API_URL } from './config';
import { handleResponse } from './helpers';
import queryString from 'query-string';
import './style/intro.css';

// Specify a SURVEY LIST HERE FOR SIMPLICITY
// IMPORTANT: Has to match the import names in the Survey.js !!!
// THIS IS SURVEY_LIST FOR TIME POINT 1!

const survey_list = [
// this goes on each time point
'demo',
'pad',
'hads',
'pss',
'pswq',
// this are time point 1 specific
// 'ius', -> moved to the 2nd time point
// 'bis', -> moved to the 2nd time point
'iq'
 ]

const n =  survey_list.length-1;

class Intro extends React.Component {
  constructor(props) {
    super(props);

    let url    = this.props.location.search;
    console.log("url", url)
    let params = queryString.parse(url);

    // console.log(params)
    const prolific_id = (params['PROLIFIC_PID']=== undefined ? 'undefined' : params['PROLIFIC_PID'])
    const study_id    = (params['STUDY_ID']=== undefined ? 'undefined' : params['STUDY_ID'])

    var currentDate   = new Date(); // maybe change to local
    var date          = currentDate.getDate();
    var month         = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year          = currentDate.getFullYear();
    var dateString    = date + "-" +(month + 1) + "-" + year;


   this.state = {
      participant_id: 1, // by default
      prolific_id: prolific_id,
      study_id: study_id,
      longit_id: 1, // by default the first presentation of task, might be subject to modifications
      block_number : 0, // has to be in the parent for Survey component for proper functioning
      TotalBlock: n, // has to be in the parent for Survey component for proper functioning
      date: dateString,
      survey_list: survey_list,
      task: true
  }

  console.log("in Intro", this.state)

    this.redirectToTarget.bind(this);
    this.fetchParticipantInfo.bind(this);
  }


  static contextTypes = {
    router: PropTypes.object
  }

  // Mount the component to call the BACKEND and GET the information
    componentWillMount() {
    document.body.style.background = "fff";
    this.fetchParticipantInfo();
    }


  redirectToTarget(){
    this.props.history.push({
      pathname: `/Consent`,
      state: {participant_info: this.state}
    })
  }

  fetchParticipantInfo () {
         fetch(`${API_URL}/participants_question_data/last_participant_id`)
           .then(handleResponse)
           .then((data) => {
             const participant_id_ = parseInt(data['new_participant_id'])
             // console.log(participant_id_)

             this.setState({
                     participant_id : participant_id_,
                 });
         })
           .catch((error) => {
            console.log(error)
         });
        }

render() {
  return (
      <div>
        <div className="IntroConsentText">
          <p><span className="bold">INFORMATION FOR THE PARTICIPANT</span></p>
          <p><span className="bold">Who is conducting this research study?</span></p>
          <p>This research is being conducted by the Wellcome Centre for Human Neuroimaging and the Max Planck UCL Centre for Computational Psychiatry and Ageing Research.</p>
          <p>The lead researchers for this project are Magda Dubois (magda.dubois.18@ucl.ac.uk) and Dr. Tobias Hauser (t.hauser@ucl.ac.uk).</p>
          <p>This study has been approved by the UCL Research Ethics Committee (project ID number 15301\001) and funded by the Wellcome Trust.</p>
          <p><span className="bold">What is the purpose of this study?</span></p>
          <p>We are interested in how the adult brain controls learning and decision-making. This research aims to provide insights into how the healthy brain works to help us understand the causes of a number of different medical conditions.</p>
          <p><span className="bold">Who can take part in this study?</span></p>
          <p>Adults (aged 18 years or over).</p>
          <p><span className="bold">What will happen to me if I take part?</span></p>
          <p>You will play one or more online computer games, which will last around approximately 20 minutes.</p>
          <p>You will receive between <span className="bold">£8.25</span> and <span className="bold">£9.25</span> for helping us.</p>

          <p>The amount could vary based on the decisions you make in the game.</p>
          <p>You will also be asked some questions about yourself, your feelings, background, attitudes and behaviour in your everyday life.</p>
          <p>There will also be some questions about reasoning.</p>
          <p>For this experiment we are interested in multiple different processes in learning and decision-making.</p>
          <p>After you complete this session, we will invite you to participate in further sessions. You will be compensated after completion of each session with <span className="bold">£8.25/h</span> and if you participate in the whole experiment you will receive a total of <span className="bold">approximately £20</span>.</p>
          <p>Remember, you are free to withdraw at any time without giving a reason.</p>

          <p><span className="bold">What are the possible disadvantages and risks of taking part?</span></p>
          <p>The task you complete does not pose any known risks.</p>
          <p>You will be asked to answer some questions about mood and feelings, and we will provide information about ways to seek help should you feel affected by the issues raised by these questions.</p>

          <p><span className="bold">What are the possible benefits of taking part?</span></p>
          <p>While there are no immediate benefits to taking part, your participation in this research will help us understand how people make decisions and this could have benefits for our understanding of mental health problems.</p>

          <p><span className="bold">Complaints</span></p>
          <p>If you wish to complain or have any concerns about any aspect of the way you have been approached or treated by members of staff, then the research UCL complaints mechanisms are available to you.</p>
          <p>In the first instance, please talk to the researcher or the chief investigator (Dr Tobias Hauser, t.hauser@ucl.ac.uk) about your complaint.</p>
          <p>If you feel that the complaint has not been resolved satisfactorily, please contact the chair of the UCL Research Ethics Committee (ethics@ucl.ac.uk).</p>
          <p>If you are concerned about how your personal data are being processed please contact the data controller who is UCL: data-protection@ucl.ac.uk.</p>
          <p>If you remain unsatisfied, you may wish to contact the Information Commissioner’s Office (ICO).</p>
          <p>Contact details, and details of data subject rights, are available on the ICO website <a style={{display: "table-cell"}} href="https://ico.org.uk/for-organisations/data-protection-reform/overview-of-the-gdpr/individuals-rights" target="_blank">here</a></p>

          <p><span className="bold">What about my data?</span></p>
          <p>This ‘local’ privacy notice sets out the information that applies to this particular study.</p>
          <p>Further information on how UCL uses participant information can be found in our ‘general’ privacy notice:</p>
          <p>For participants in research studies, click <a style={{display: "table-cell"}} href="https://www.ucl.ac.uk/legal-services/privacy/ucl-general-research-participant-privacy-notice" target="_blank">here</a></p>

          <p> The information that is required to be provided to participants under data protection legislation (GDPR and DPA 2018) is provided across both the ‘local’ and ‘general’ privacy notices.</p>
          <p>To help future research and make the best use of the research data you have given us (such as answers to questionnaires) we may keep your research data indefinitely and share these.</p>
          <ul>
          <p>The data we collect will be shared and held as follows:</p>
          <p></p>
          <li>{}In publications, your data will be anonymised, so you cannot be identified.</li>
          <p></p>
          <li>{}In public databases, your data will be anonymised or pseudonymised (your personal details will be removed, and a code used e.g. 00001232, instead of your User ID).</li>
          <p></p>
          <li>{}We do not collect any personal data that could be used to identify you</li>
          <p></p>
          <li>{}Personal data is any information that could be used to identify you, such as your User ID. Your User ID will be used to combine datasets from the different timepoints at which you complete tasks for this study. Once you complete the final task in this study, we will replace your User ID with a randomly generated ID that is non identifying.</li>
          </ul>
          <p>The legal basis used to process your personal data will be the provision of public task (this means that the research you are taking part in is deemed to be in the public interest).</p>
          <p>The legal basis used to process special category data (i.e. ethnicity) will be for scientific research purposes. We will follow the UCL and legal guidelines to safeguard your data.</p>
          <p>If you change your mind and withdraw your consent to participate in this study you can contact us via Prolific.</p>
          <p><span className="bold">However, we collect all data in an anonymised form, which is why this data cannot be destroyed, withdrawn or recalled.</span></p>
          <p></p>
          <p>If there are any queries or concerns please do not hesitate to contact: Magda Dubois, magda.dubois.18@ucl.ac.uk</p>
        </div>
        <div>
        <div className="buttonContainer">
          <Button type="button" onClick={()=>this.redirectToTarget()}>NEXT</Button>
        </div>
        </div>
        </div>
    );
  }
}

export default withRouter(Intro);
