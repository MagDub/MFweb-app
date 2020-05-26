var quizQuestions = [

/*
  IQ test from Rouault et al. 2018
  Adapted for COVID19 STUDY by VS
  March 2020
*/

{
  question: "Please read each question carefully and answer as best as you can.",

  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button",
      questionId: 0,
      surveytag: 'iq',
      title: '',
      constraint: [
        {min: ""},
        {max: ""}
      ]
},


{
      question:"What number is one fifth of one fourth of one ninth of 900?",
      answers: [{
        type: "iq-1",
        content: "2"},

        {type: "iq-2",
        content: "3"},

        {type: "iq-3",
        content: "4"},

        {type: "iq-4",
        content: "5"},

        {type: "iq-5",
        content: "6"},

        {type: "iq-6",
        content: "7"},],

      qtype: 'quiz',
      questionId: 1,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },


{
   question:"Zach is taller than Matt and Richard is shorter than Zach. Which of the following statements would be the most accurate?",

   answers: [{
        type: "iq-1",
        content: "Richard is taller than Matt"},

        {type: "iq-2",
        content: "Richard is shorter than Matt"},

        {type: "iq-3",
        content: "Richard is as tall as Matt"},

        {type: "iq-4",
        content: "It's impossible to tell"}],

      qtype: 'quiz',
      questionId: 2,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },


  {
   question:"Joshua is 12 years old and his sister is three times as old as he. When Joshua is 23 years old, how old will his sister be?'",

	answers: [{
        type: "iq-1",
        content: "25"},

        {type: "iq-2",
        content: "39"},

        {type: "iq-3",
        content: "44"},

        {type: "iq-4",
        content: "47"},

        {type: "iq-5",
        content: "53"},

        {type: "iq-6",
        content: "57"}],

      qtype: 'quiz',
      questionId: 3,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },

  {
   question:"If the day after tomorrow is two days before Thursday then what day is it today?",

	answers: [{
        type: "iq-1",
        content: "Friday"},

        {type: "iq-2",
        content: "Monday"},

        {type: "iq-3",
        content: "Wednesday"},

        {type: "iq-4",
        content: "Saturday"},

        {type: "iq-5",
        content: "Tuesday"},

        {type: "iq-6",
        content: "Sunday"}
        ],

      qtype: 'quiz',
      questionId: 4,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },

  {
   question:"In the following alphanumeric series, what letter comes next? K N P S U ...",

	answers: [{
        type: "iq-1",
        content: "S"},

        {type: "iq-2",
        content: "T"},

        {type: "iq-3",
        content: "U"},

        {type: "iq-4",
        content: "V"},

        {type: "iq-5",
        content: "W"},

        {type: "iq-6",
        content: "X"}],

      qtype: 'quiz',
      questionId: 5,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}]
  },

{
   question:"In the following alphanumeric series, what letter comes next? V Q M J H ...",

   answers: [{
        type: "iq-1",
        content: "E"},

        {type: "iq-2",
        content: "F"},

        {type: "iq-3",
        content: "G"},

        {type: "iq-4",
        content: "H"},

        {type: "iq-5",
        content: "I"},

        {type: "iq-6",
        content: "J"}],

      qtype: 'quiz',
      questionId: 6,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },

  {
   question:"In the following alphanumeric series, what letter comes next? I J L O S ...",

   answers: [{
        type: "iq-1",
        content: "T"},

        {type: "iq-2",
        content: "U"},

        {type: "iq-3",
        content: "V"},

        {type: "iq-4",
        content: "X"},

        {type: "iq-5",
        content: "Y"},

        {type: "iq-6",
        content: "Z"}],

      qtype: 'quiz',
      questionId: 7,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },

  {
   question:"In the following alphanumeric series, what letter comes next? Q S N P L ...",

   answers: [{
        type: "iq-1",
        content: "J"},

        {type: "iq-2",
        content: "H"},

        {type: "iq-3",
        content: "I"},

        {type: "iq-4",
        content: "N"},

        {type: "iq-5",
        content: "M"},

        {type: "iq-6",
        content: "L"}],

      qtype: 'quiz',
      questionId: 8,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}

      ]
  },

{
   question:"Which figure fits into the missing slot?",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"}],

      qtype: 'quiz',
      questionId: 9,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "mx45_q.png",
       image_a:"mx45_a.png"

  },


  {
   question:"Which figure fits into the missing slot?",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"}],

      qtype: 'quiz',
      questionId: 10,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "mx46_q.png",
       image_a:"mx46_a.png"

  },

  {
   question:"Which figure fits into the missing slot?",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"}],

      qtype: 'quiz',
      questionId: 11,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "mx47_q.png",
       image_a:"mx47_a.png"

  },

  {
   question:"Which figure fits into the missing slot?",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"}],

      qtype: 'quiz',
      questionId: 12,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "mx55_q.png",
       image_a:"mx55_a.png"

  },


{
   question:"All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"},

        {type: "iq-7",
        content: "G"},

        {type: "iq-8",
        content: "H"}],

      qtype: 'quiz',
      questionId: 13,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "rsd3_q.png"

  },

  {
   question:"All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"},

        {type: "iq-7",
        content: "G"},

        {type: "iq-8",
        content: "H"}],

      qtype: 'quiz',
      questionId: 14,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "rsd4_q.png"

  },


{
   question:"All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"},

        {type: "iq-7",
        content: "G"},

        {type: "iq-8",
        content: "H"}],

      qtype: 'quiz',
      questionId: 15,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "rsd6_q.png"

  },

  {
   question:"All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",

   answers: [{
        type: "iq-1",
        content: "A"},

        {type: "iq-2",
        content: "B"},

        {type: "iq-3",
        content: "C"},

        {type: "iq-4",
        content: "D"},

        {type: "iq-5",
        content: "E"},

        {type: "iq-6",
        content: "F"},

        {type: "iq-7",
        content: "G"},

        {type: "iq-8",
        content: "H"}],

      qtype: 'quiz',
      questionId: 16,
      surveytag: 'iq',
      title: '',
      constraint: [
       {min: ""},
       {max: ""}],
       image: "rsd8_q.png"

  },


]

export default quizQuestions
