import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css'
import './style/questionnaires.css';
import 'react-showdown';

/*
var myCss = {
matrix: {
    root: "table table-striped"
},
navigationButton: "button btn-lg"
};
*/

class Questionnaires extends Component {


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
    var json = { title: "Surveys", showProgressBar: "top", pages: [
        {questions: [
            { type: "matrix", name: "ASRS", title: "Please indicate what best describes how you have felt and conducted yourself over the past 6 months. ",
                columns: [
                    { value: 1, text: "Never" },
                    { value: 2, text: "Rarely" },
                    { value: 3, text: "Sometimes" },
                    { value: 4, text: "Often" },
                    { value: 5, text: "Very Often" }],
                rows: [
                    { value: "ASRS_1_wrapping",       text: "1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?" },
                    { value: "ASRS_2_order",          text: "2. How often do you have difficulty getting things in order when you have to do a task that requires organization?" },
                    { value: "ASRS_3_remembering",    text: "3. How often do you have problems remembering appointments or obligations?" },
                    { value: "ASRS_4_delay",          text: "4. When you have a task that requires a lot of thought, how often do you avoid or delay getting started?" },
                    { value: "ASRS_5_fidget",         text: "5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?" },
                    { value: "ASRS_6_active",         text: "6. How often do you feel overly active and compelled to do things, like you were driven by a motor?" },
                    { value: "ASRS_7_careless",       text: "7. How often do you make careless mistakes when you have to work on a boring or difficult project?" },
                    { value: "ASRS_8_attention",      text: "8. How often do you have difficulty keeping your attention when you are doing boring or repetitive work?" },
                    { value: "ASRS_9_concentration",  text: "9. How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?" },
                    { value: "ASRS_10_misplace",      text: "10. How often do you misplace or have difficulty finding things at home or at work?" },
                    { value: "ASRS_11_distracted",    text: "11. How often are you distracted by activity or noise around you?" },
                    { value: "ASRS_12_leave",         text: "12. How often do you leave your seat in meetings or other situations in which you are expected to remain seated?" },
                    { value: "ASRS_13_restless",      text: "13. How often do you feel restless or fidgety?" },
                    { value: "ASRS_14_unwinding",     text: "14. How often do you have difficulty unwinding and relaxing when you have time to yourself?" },
                    { value: "ASRS_15_talking",       text: "15. How often do you find yourself talking too much when you are in social situations?" },
                    { value: "ASRS_16_finishing",     text: "16. When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?" },
                    { value: "ASRS_17_waiting",       text: "17. How often do you have difficulty waiting your turn in situations when turn taking is required?" },
                    { value: "ASRS_18_interrupt",     text: "18. How often do you interrupt others when they are busy?" }
                  ]},
        ]},

        {questions: [
            { type: "matrix", name: "BIS11", title: "People differ in the ways they act and think in different situations. This is a test to measure some of the ways in which you act and think. Do not spend too much time on any statement. Answer quickly and honestly.",
                columns: [
                    { value: 1, text: "Rarely/Never" },
                    { value: 2, text: "Occasionally" },
                    { value: 3, text: "Often" },
                    { value: 4, text: "Almost Always/Always" }],
                rows: [
                    { value: "BIS11_1_plan",        text: "1. I plan tasks carefully." },
                    { value: "BIS11_2_thinking",    text: "2. I do things without thinking." },
                    { value: "BIS11_3_mind",        text: "3. I make-up my mind quickly." },
                    { value: "BIS11_4_happy",       text: "4. I am happy-go-lucky." },
                    { value: "BIS11_5_attention",   text: "5. I don’t “pay attention.”" },
                    { value: "BIS11_6_racing",      text: "6. I have “racing” thoughts." },
                    { value: "BIS11_7_trips",       text: "7. I plan trips well ahead of time." },
                    { value: "BIS11_8_control",     text: "8. I am self controlled." },
                    { value: "BIS11_9_concentrate", text: "9. I concentrate easily." },
                    { value: "BIS11_10_save",       text: "10. I save regularly." },
                    { value: "BIS11_11_squirm",     text: "11. I “squirm” at plays or lectures." },
                    { value: "BIS11_12_careful",    text: "12. I am a careful thinker." },
                    { value: "BIS11_13_security",   text: "13. I plan for job security." },
                    { value: "BIS11_14_say",        text: "14. I say things without thinking." },
                    { value: "BIS11_15_complex",    text: "15. I like to think about complex problems." },
                    { value: "BIS11_16_job",        text: "16. I change jobs." },
                    { value: "BIS11_17_impulse",    text: "17. I act “on impulse.”" },
                    { value: "BIS11_18_bored",      text: "18. I get easily bored when solving thought problems." },
                    { value: "BIS11_19_spur",       text: "19. I act on the spur of the moment." },
                    { value: "BIS11_20_steady",     text: "20. I am a steady thinker." },
                    { value: "BIS11_21_residence",  text: "21. I change residences." },
                    { value: "BIS11_22_buy",        text: "22. I buy things on impulse." },
                    { value: "BIS11_23_think",      text: "23. I can only think about one thing at a time." },
                    { value: "BIS11_24_hobbies",    text: "24. I change hobbies." },
                    { value: "BIS11_25_earn",       text: "25. I spend or charge more than I earn." },
                    { value: "BIS11_26_extraneour", text: "26. I often have extraneous thoughts when thinking." },
                    { value: "BIS11_27_present",    text: "27. I am more interested in the present than the future." },
                    { value: "BIS11_28_restless",   text: "28. I am restless at the theater or lectures." },
                    { value: "BIS11_29_puzzles",    text: "29. I like puzzles." },
                    { value: "BIS11_30_future",     text: "30. I am future oriented." }
                  ]},
        ]},

        {questions: [
            {   type: "matrix", name: "IUS", /*isAllRowRequired: true,*/
                title: "You will find below a series of statements which describe how people may react to the uncertainties of life. Please use the scale below to describe to what extent each item is characteristic of you.",
                columns: [
                    { value: 1, text: "1 - Not at all" },
                    { value: 2, text: "2" },
                    { value: 3, text: "3 - Somewhat" },
                    { value: 4, text: "4" },
                    { value: 5, text: "5 - Entirely" }
                  ],
                rows: [
                    { value: "IUS_1_opinion",        text: "1. Uncertainty stops me from having a firm opinion." },
                    { value: "IUS_2_disorganized",   text: "2. Being uncertain means that a person is disorganized." },
                    { value: "IUS_3_intolerable",    text: "3. Uncertainty makes life intolerable." },
                    { value: "IUS_4_guarantees",     text: "4. It’s unfair not having any guarantees in life." },
                    { value: "IUS_5_tomorrow",       text: "5. My mind can’t be relaxed if I don’t know what will happen tomorrow." },
                    { value: "IUS_6_uneasy",         text: "6. Uncertainty makes me uneasy, anxious, or stressed." },
                    { value: "IUS_7_unforeseen",     text: "7. Unforeseen events upset me greatly." },
                    { value: "IUS_8_information",    text: "8. It frustrates me not having all the information I need." },
                    { value: "IUS_9_full",           text: "9. Uncertainty keeps me from living a full life." },
                    { value: "IUS_10_ahead",         text: "10. One should always look ahead so as to avoid surprises." },
                    { value: "IUS_11_spoil",         text: "11. A small unforeseen event can spoil everything, even with the best of planning." },
                    { value: "IUS_12_paralyses",     text: "12. When it’s time to act, uncertainty paralyses me." },
                    { value: "IUS_13_first",         text: "13. Being uncertain means that I am not first rate." },
                    { value: "IUS_14_forward",       text: "14. When I am uncertain, I can’t go forward." },
                    { value: "IUS_15_function",      text: "15. When I am uncertain I can’t function very well." },
                    { value: "IUS_16_going",         text: "16. Unlike me, others always seem to know where they are going with their lives." },
                    { value: "IUS_17_vulnerable",    text: "17. Uncertainty makes me vulnerable, unhappy, or sad." },
                    { value: "IUS_18_future",        text: "18. I always want to know what the future has in store for me." },
                    { value: "IUS_19_surprise",      text: "19. I can’t stand being taken by surprise." },
                    { value: "IUS_20_doubt",         text: "20. The smallest doubt can stop me from acting." },
                    { value: "IUS_21_advance",       text: "21. I should be able to organize everything in advance." },
                    { value: "IUS_22_confidence",    text: "22. Being uncertain means that I lack confidence." },
                    { value: "IUS_23_unfair",        text: "23. I think it’s unfair that other people seem sure about their future." },
                    { value: "IUS_24_sleeping",      text: "24. Uncertainty keeps me from sleeping soundly." },
                    { value: "IUS_25_away",          text: "25. I must get away from all uncertain situations." },
                    { value: "IUS_26_ambiguities",   text: "26. The ambiguities in life stress me." },
                    { value: "IUS_27_undecided",     text: "27. I can’t stand being undecided about my future." }
                  ]},
        ]}
    ]};

    if(this.state.isCompleted===0){
      return <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent}/>
    }
    else {
      console.log("JSON string",this.resultAsString);

      //this.sendDataToServer()

      this.props.history.push({
        pathname: `/Task`,
        state: {participant_info: this.props.location.state.participant_info, newblock_frame: true} // to be changed
      })

      return null
    }
  }
}

export default Questionnaires;
