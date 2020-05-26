var quizQuestions = [

/*
  Perceived Stress Scale
  by VS March 2020
*/

{
  question: "The questions in this scale ask you about your feelings and thoughts during the LAST MONTH. Please, indicate how often you felt or thought a certain way",
  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button",
      questionId: 0,
      surveytag: 'pss',
      title: '',
      constraint: [
        {min: ""},
        {max: ""}
      ]
},

{
      question:"In the last month, how often have you been upset because of something that happened unexpectedly?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 1,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },


  {
      question:"In the last month, how often have you felt that you were unable to control the important things in your life?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 2,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you felt nervous and 'stressed'?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 3,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you felt confident about your ability to handle your personal problems?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 4,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you felt that things were going your way?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 5,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you found that you could not cope with all the things that you had to do?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 6,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you been able to control irritations in your life?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 7,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you felt that you were on top of things?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 8,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you been angered because of things that were outside of your control?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 9,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

  {
      question:"In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",

      answers: [{
         type: "pss-1",
        content: "Very often"},

        {type: "pss-2",
        content: "Fairly often"},

        {type: "pss-3",
        content: "Sometimes"},

        {type: "pss-4",
        content: "Almost never"},

        {type: "pvd-5",
        content: "Never"},
      ],
      qtype: 'quiz',
      questionId: 10,
      surveytag: 'pss',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ]
  },

]

export default quizQuestions;
