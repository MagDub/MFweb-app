var quizQuestions = [

/*
  COVID-19 STUDY DEMOGRPAHIC QUESTIONS
  March 2020 by VS
*/

{
     question: "What region of the UK do you currently live in?",
     answers: [
     {
             type: "demo-1",
             content: "Scotland"
         },
         {
             type: "demo-2",
             content: "Northern Ireland"
         },

         {
             type: "demo-3",
             content: "Wales"
         },

         {
             type: "demo-4",
             content: "North East"
         },

         {
             type: "demo-5",
             content: "North West"
         },

         {
             type: "demo-6",
             content: "Yorkshire and the Humber"
         },

         {
             type: "demo-7",
             content: "West Midlands"
         },

         {
             type: "demo-8",
             content: "East Midlands"
         },

         {
             type: "demo-9",
             content: "South West"
         },

         {
             type: "demo-10",
             content: "South East"
         },

         {
             type: "demo-11",
             content: "East of England"
         },

         {
             type: "demo-12",
             content: "Greater London"
         },

     ],
     qtype: 'quiz',
     questionId: 1,
     surveytag: 'demo',
     title: '',
     constraint: [
       {min: ""},
       {max: ""}
     ]

},
 {
     question: "How old are you?",
     answers: [
     {
             type: "demo-1",
             content: "18-24 years old"
         },
         {
             type: "demo-2",
             content: "25-34 years old"
         },

         {
             type: "demo-3",
             content: "35-44 years old"
         },

         {
             type: "demo-4",
             content: "45-54 years old"
         },

         {
             type: "demo-5",
             content: "55-64 years old"
         },

         {
             type: "demo-6",
             content: "65-74 years old"
         },

         {
             type: "demo-7",
             content: "75 years older"
         },

     ],
     qtype: 'quiz',
     questionId: 2,
     surveytag: 'demo',
     title: '',
     constraint: [
       {min: ""},
       {max: ""}
     ]

 },

 {
     question: "What gender do you identify with?",
     answers: [
         {
             type: "demo-1",
             content: "Male"
         },
         {
             type: "demo-2",
             content: "Female"
         },

         {
             type: "demo-3",
             content: "Both/Neither/Fluid/Other"
         },

     ],
     qtype: "quiz",
     questionId: 3,
     surveytag: 'demo',
     title: '',
     constraint: [
       {min: ""},
       {max: ""}
     ]
 },

{
    question:"Please, use the image below to answer.",

    answers: [{
        type: "answer-1",
        content: "1"},

        {type: "answer-2",
        content: "2"},

        {type: "answer-3",
        content: "3"},

        {type: "answer-4",
        content: "4"},

        {type: "answer-5",
        content: "5"},

        {type: "answer-6",
        content: "6"},

        {type: "answer-7",
        content: "7"},

        {type: "answer-8",
        content: "8"},

        {type: "answer-9",
        content: "9"},

        {type: "answer-10",
        content: "10"},

      ],
      qtype: 'quiz',
      questionId: 4,
      surveytag: 'demo',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}
      ],

      image:'ladder.png'

  },


{
      question: "What is the highest level of education you have achieved?",
      answers: [
      {
              type: "demo-1",
              content: "Lower school"
          },
          {
              type: "demo-2",
              content: "High school"
          },

          {
              type: "demo-3",
              content: "Undergraduate degree"
          },

          {
              type: "demo-4",
              content: "Postgraduate/Professional degree or other"
          },
      ],
      qtype: 'quiz',
      questionId: 5,
      surveytag: 'demo',
      title: '',
      constraint: [
        {min: ""},
        {max: ""}
      ]

  },


]

export default quizQuestions;
