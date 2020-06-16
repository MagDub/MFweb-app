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
import queryString from 'query-string';


class Consent extends Component {

  constructor(props) {
    super(props);

    //console.log(this.props.location)
    let url    = this.props.location.search;
    //console.log("url", url)
    let params = queryString.parse(url);
    //console.log("params", params)
    const prolific_id = (params['PROLIFIC_PID']=== undefined ? 'undefined' : params['PROLIFIC_PID'])
    //console.log("prolific_id", prolific_id)
    const task_no = Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100;
    const training_no = Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100;

    var currentDate   = new Date();
    var date          = currentDate.getDate();
    var month         = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year          = currentDate.getFullYear();
    var dateString    = date + "-" +(month + 1) + "-" + year;
    var timeString    = currentDate.toTimeString();

    this.state = {
      prolific_id: prolific_id,
      ConsentCompleted: 0,
      date: dateString,
      startTime: timeString,
      task_no: task_no,
      training_no: training_no,

      images_fb:["http://www.brainexplorer.net/MF/images_training/thumbs_up.png", "http://www.brainexplorer.net/MF/images_training/thumbs_down.png"],

      training_bg:["http://www.brainexplorer.net/MF/images_training/training_1_empty.png","http://www.brainexplorer.net/MF/images_training/training_2_empty.png","http://www.brainexplorer.net/MF/images_training/training_3_empty.png","http://www.brainexplorer.net/MF/images_training/training_4_empty.png"],

      instruc_bg:["http://www.brainexplorer.net/MF/instructions/slide_empty_1arrow.png", "http://www.brainexplorer.net/MF/instructions/slide_empty_2arrows.png", "http://www.brainexplorer.net/MF/instructions/slide6.png", "http://www.brainexplorer.net/MF/instructions/slide7.png", "http://www.brainexplorer.net/MF/instructions/slide8.png", "http://www.brainexplorer.net/MF/instructions/slide9.png", "http://www.brainexplorer.net/MF/instructions/slide10.png", "http://www.brainexplorer.net/MF/instructions/slide11.png", "http://www.brainexplorer.net/MF/instructions/slide12.png", "http://www.brainexplorer.net/MF/instructions/slide13.png", "http://www.brainexplorer.net/MF/instructions/slide14.png", "http://www.brainexplorer.net/MF/instructions/slide15.png", "http://www.brainexplorer.net/MF/instructions/slide16.png", "http://www.brainexplorer.net/MF/instructions/slide17.png", "http://www.brainexplorer.net/MF/instructions/slide18.png"],

      questions_bg:["http://www.brainexplorer.net/MF/instructions/slide_empty_0arrow.png"],

      loading_bg: ["http://www.brainexplorer.net/MF/loading.jpg"],

      training_apple_col:["http://www.brainexplorer.net/MF/images_training/apple_1.png","http://www.brainexplorer.net/MF/images_training/apple_2.png","http://www.brainexplorer.net/MF/images_training/apple_3.png","http://www.brainexplorer.net/MF/images_training/apple_4.png"],

      image_bg_1:["http://www.brainexplorer.net/MF/images_set1/sun_1.png", "http://www.brainexplorer.net/MF/images_set1/sun_2.png", "http://www.brainexplorer.net/MF/images_set1/sun_3.png", "http://www.brainexplorer.net/MF/images_set1/sun_4.png", "http://www.brainexplorer.net/MF/images_set1/sun_5.png", "http://www.brainexplorer.net/MF/images_set1/sun_6.png", "http://www.brainexplorer.net/MF/images_set1/sun_7.png"],
      image_bg_2:["http://www.brainexplorer.net/MF/images_set2/sun_1.png", "http://www.brainexplorer.net/MF/images_set2/sun_2.png", "http://www.brainexplorer.net/MF/images_set2/sun_3.png", "http://www.brainexplorer.net/MF/images_set2/sun_4.png", "http://www.brainexplorer.net/MF/images_set2/sun_5.png", "http://www.brainexplorer.net/MF/images_set2/sun_6.png", "http://www.brainexplorer.net/MF/images_set2/sun_7.png"],
      image_bg_3:["http://www.brainexplorer.net/MF/images_set3/sun_1.png", "http://www.brainexplorer.net/MF/images_set3/sun_2.png", "http://www.brainexplorer.net/MF/images_set3/sun_3.png", "http://www.brainexplorer.net/MF/images_set3/sun_4.png", "http://www.brainexplorer.net/MF/images_set3/sun_5.png", "http://www.brainexplorer.net/MF/images_set3/sun_6.png", "http://www.brainexplorer.net/MF/images_set3/sun_7.png"],
      image_bg_4:["http://www.brainexplorer.net/MF/images_set4/sun_1.png", "http://www.brainexplorer.net/MF/images_set4/sun_2.png", "http://www.brainexplorer.net/MF/images_set4/sun_3.png", "http://www.brainexplorer.net/MF/images_set4/sun_4.png", "http://www.brainexplorer.net/MF/images_set4/sun_5.png", "http://www.brainexplorer.net/MF/images_set4/sun_6.png", "http://www.brainexplorer.net/MF/images_set4/sun_7.png"],
      image_bg_5:["http://www.brainexplorer.net/MF/images_set5/sun_1.png", "http://www.brainexplorer.net/MF/images_set5/sun_2.png", "http://www.brainexplorer.net/MF/images_set5/sun_3.png", "http://www.brainexplorer.net/MF/images_set5/sun_4.png", "http://www.brainexplorer.net/MF/images_set5/sun_5.png", "http://www.brainexplorer.net/MF/images_set5/sun_6.png", "http://www.brainexplorer.net/MF/images_set5/sun_7.png"],
      image_bg_6:["http://www.brainexplorer.net/MF/images_set6/sun_1.png", "http://www.brainexplorer.net/MF/images_set6/sun_2.png", "http://www.brainexplorer.net/MF/images_set6/sun_3.png", "http://www.brainexplorer.net/MF/images_set6/sun_4.png", "http://www.brainexplorer.net/MF/images_set6/sun_5.png", "http://www.brainexplorer.net/MF/images_set6/sun_6.png", "http://www.brainexplorer.net/MF/images_set6/sun_7.png"],
      image_bg_7:["http://www.brainexplorer.net/MF/images_set7/sun_1.png", "http://www.brainexplorer.net/MF/images_set7/sun_2.png", "http://www.brainexplorer.net/MF/images_set7/sun_3.png", "http://www.brainexplorer.net/MF/images_set7/sun_4.png", "http://www.brainexplorer.net/MF/images_set7/sun_5.png", "http://www.brainexplorer.net/MF/images_set7/sun_6.png", "http://www.brainexplorer.net/MF/images_set7/sun_7.png"],
      image_bg_8:["http://www.brainexplorer.net/MF/images_set8/sun_1.png", "http://www.brainexplorer.net/MF/images_set8/sun_2.png", "http://www.brainexplorer.net/MF/images_set8/sun_3.png", "http://www.brainexplorer.net/MF/images_set8/sun_4.png", "http://www.brainexplorer.net/MF/images_set8/sun_5.png", "http://www.brainexplorer.net/MF/images_set8/sun_6.png", "http://www.brainexplorer.net/MF/images_set8/sun_7.png"],

      juice_small_bg:["http://www.brainexplorer.net/MF/juice_small/juice1.png", "http://www.brainexplorer.net/MF/juice_small/juice2.png", "http://www.brainexplorer.net/MF/juice_small/juice3.png", "http://www.brainexplorer.net/MF/juice_small/juice4.png", "http://www.brainexplorer.net/MF/juice_small/juice5.png", "http://www.brainexplorer.net/MF/juice_small/juice6.png", "http://www.brainexplorer.net/MF/juice_small/juice7.png", "http://www.brainexplorer.net/MF/juice_small/juice8.png", "http://www.brainexplorer.net/MF/juice_small/juice9.png", "http://www.brainexplorer.net/MF/juice_small/juice10.png"],
      juice_big_bg:["http://www.brainexplorer.net/MF/juice_big/juice1.png", "http://www.brainexplorer.net/MF/juice_big/juice2.png", "http://www.brainexplorer.net/MF/juice_big/juice3.png", "http://www.brainexplorer.net/MF/juice_big/juice4.png", "http://www.brainexplorer.net/MF/juice_big/juice5.png", "http://www.brainexplorer.net/MF/juice_big/juice6.png", "http://www.brainexplorer.net/MF/juice_big/juice7.png", "http://www.brainexplorer.net/MF/juice_big/juice8.png", "http://www.brainexplorer.net/MF/juice_big/juice9.png", "http://www.brainexplorer.net/MF/juice_big/juice10.png"],

      block_start_bg:["http://www.brainexplorer.net/MF/block_images/startblock_1.jpg", "http://www.brainexplorer.net/MF/block_images/startblock_2.jpg", "http://www.brainexplorer.net/MF/block_images/startblock_3.jpg", "http://www.brainexplorer.net/MF/block_images/startblock_4.jpg"],
      block_finish_bg:["http://www.brainexplorer.net/MF/block_images/finishblock_4.jpg"],

      apple_col1:["http://www.brainexplorer.net/MF/images_set1/apple_1.png","http://www.brainexplorer.net/MF/images_set1/apple_2.png","http://www.brainexplorer.net/MF/images_set1/apple_3.png"],
      apple_col2:["http://www.brainexplorer.net/MF/images_set2/apple_1.png","http://www.brainexplorer.net/MF/images_set2/apple_2.png","http://www.brainexplorer.net/MF/images_set2/apple_3.png"],
      apple_col3:["http://www.brainexplorer.net/MF/images_set3/apple_1.png","http://www.brainexplorer.net/MF/images_set3/apple_2.png","http://www.brainexplorer.net/MF/images_set3/apple_3.png"],
      apple_col4:["http://www.brainexplorer.net/MF/images_set4/apple_1.png","http://www.brainexplorer.net/MF/images_set4/apple_2.png","http://www.brainexplorer.net/MF/images_set4/apple_3.png"],
      apple_col5:["http://www.brainexplorer.net/MF/images_set5/apple_1.png","http://www.brainexplorer.net/MF/images_set5/apple_2.png","http://www.brainexplorer.net/MF/images_set5/apple_3.png"],
      apple_col6:["http://www.brainexplorer.net/MF/images_set6/apple_1.png","http://www.brainexplorer.net/MF/images_set6/apple_2.png","http://www.brainexplorer.net/MF/images_set6/apple_3.png"],
      apple_col7:["http://www.brainexplorer.net/MF/images_set7/apple_1.png","http://www.brainexplorer.net/MF/images_set7/apple_2.png","http://www.brainexplorer.net/MF/images_set7/apple_3.png"],
      apple_col8:["http://www.brainexplorer.net/MF/images_set8/apple_1.png","http://www.brainexplorer.net/MF/images_set8/apple_2.png","http://www.brainexplorer.net/MF/images_set8/apple_3.png"],


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

    var training_bg = this.state.training_bg;
    var instruc_bg = this.state.instruc_bg;
    var questions_bg = this.state.questions_bg;
    var loading_bg = this.state.loading_bg;
    var image_bg_1 = this.state.image_bg_1;
    var image_bg_2 = this.state.image_bg_2;
    var image_bg_3 = this.state.image_bg_3;
    var image_bg_4 = this.state.image_bg_4;
    var image_bg_5 = this.state.image_bg_5;
    var image_bg_6 = this.state.image_bg_6;
    var image_bg_7 = this.state.image_bg_7;
    var image_bg_8 = this.state.image_bg_8;
    var juice_small_bg = this.state.juice_small_bg;
    var juice_big_bg = this.state.juice_big_bg;
    var block_start_bg = this.state.block_start_bg;
    var block_finish_bg = this.state.block_finish_bg;
    var apple_col1 = this.state.apple_col1;
    var apple_col2 = this.state.apple_col2;
    var apple_col3 = this.state.apple_col3;
    var apple_col4 = this.state.apple_col4;
    var apple_col5 = this.state.apple_col5;
    var apple_col6 = this.state.apple_col6;
    var apple_col7 = this.state.apple_col7;
    var apple_col8 = this.state.apple_col8;

    var training_apple_col = this.state.training_apple_col;

    instruc_bg.forEach(image => { new Image().src = image })
    training_bg.forEach(image => { new Image().src = image })
    questions_bg.forEach(image => { new Image().src = image })
    loading_bg.forEach(image => { new Image().src = image })
    training_apple_col.forEach(image => { new Image().src = image })
    image_bg_1.forEach(image => { new Image().src = image })
    image_bg_2.forEach(image => { new Image().src = image })
    image_bg_3.forEach(image => { new Image().src = image })
    image_bg_4.forEach(image => { new Image().src = image })
    image_bg_5.forEach(image => { new Image().src = image })
    image_bg_6.forEach(image => { new Image().src = image })
    image_bg_7.forEach(image => { new Image().src = image })
    image_bg_8.forEach(image => { new Image().src = image })
    juice_small_bg.forEach(image => { new Image().src = image })
    juice_big_bg.forEach(image => { new Image().src = image })
    block_finish_bg.forEach(image => { new Image().src = image })
    block_start_bg.forEach(image => { new Image().src = image })
    apple_col1.forEach(image => { new Image().src = image })
    apple_col2.forEach(image => { new Image().src = image })
    apple_col3.forEach(image => { new Image().src = image })
    apple_col4.forEach(image => { new Image().src = image })
    apple_col5.forEach(image => { new Image().src = image })
    apple_col6.forEach(image => { new Image().src = image })
    apple_col7.forEach(image => { new Image().src = image })
    apple_col8.forEach(image => { new Image().src = image })

    this.setState({
      instruc_bg: instruc_bg,
      training_bg: training_bg,
      questions_bg: questions_bg,
      image_bg_1: image_bg_1,
      image_bg_2: image_bg_2,
      image_bg_3: image_bg_3,
      image_bg_4: image_bg_4,
      image_bg_5: image_bg_5,
      image_bg_6: image_bg_6,
      image_bg_7: image_bg_7,
      image_bg_8: image_bg_8,
      apple_col1: apple_col1,
      apple_col2: apple_col2,
      apple_col3: apple_col3,
      apple_col4: apple_col4,
      apple_col5: apple_col5,
      apple_col6: apple_col6,
      apple_col7: apple_col7,
      apple_col8: apple_col8,
      juice_small_bg: juice_small_bg,
      juice_big_bg: juice_big_bg,
      block_finish_bg: block_finish_bg,
      block_start_bg: block_start_bg,
      loading_bg: loading_bg,
      training_apple_col: training_apple_col,
      mounted: 1,
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
