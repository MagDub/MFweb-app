var quizQuestions = [

/*
  Hospital Anxiety and Depression Scale HADS for the LEARNOISE ONLINE PROJECT
  by VS March 2020
*/

{
  question: "Tick the box that is the closest to how you have been feeling in the PAST WEEK. Don't take too long over your replies: your immediate is best",

  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button", // to be maybe changed
      questionId: 0,
      surveytag: 'hads',
      title: '', // to be changed
      constraint: [
        {min: ""},
        {max: ""}
      ]
},


{
      question: "I feel tense or 'wound up'",
      answers: [
          {
              type: "hads-1",
              content: "Most of the time"
          },
          {
              type: "hads-2",
              content: "A lot of the time"
          },
          {
              type: "hads-3",
              content: "From time to time, occasionally"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 1,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I feel as if I am slowed down",
      answers: [
          {
              type: "hads-1",
              content: "Nearly all the time"
          },
          {
              type: "hads-2",
              content: "Very often"
          },
          {
              type: "hads-3",
              content: "Sometimes"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 2,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I still enjoy the things I used to enjoy",
      answers: [
          {
              type: "hads-1",
              content: "Definitely as much"
          },
          {
              type: "hads-2",
              content: "Not quite so much"
          },
          {
              type: "hads-3",
              content: "Only a little"
          },
          {
              type: "hads-4",
              content: "Hardly at all"
          },
      ],
      questionId: 3,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I get a sort of frightened feeling like 'butterflies' in the stomach",
      answers: [
          {
              type: "hads-1",
              content: "Very often"
          },
          {
              type: "hads-2",
              content: "Quite often"
          },
          {
              type: "hads-3",
              content: "Occasionally"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 4,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I get a sort of frightened feeling as if something awful is about to happen",
      answers: [
          {
              type: "hads-1",
              content: "Very definitely and quite badly"
          },
          {
              type: "hads-2",
              content: "Yes, but not too badly"
          },
          {
              type: "hads-3",
              content: "A little, but it doesn't worry me"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 5,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },


{
      question: "I have lost interest in my appearance",
      answers: [
          {
              type: "hads-1",
              content: "Definitely"
          },
          {
              type: "hads-2",
              content: "I don't take as much care as I should"
          },
          {
              type: "hads-3",
              content: "I may not take quite as much care"
          },
          {
              type: "hads-4",
              content: "I take just as much care as ever"
          },
      ],
      questionId: 6,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },


  {
      question: "I can laugh and see the funny side of things",
      answers: [
          {
              type: "hads-1",
              content: "As much as I always could"
          },
          {
              type: "hads-2",
              content: "Not quite so much now"
          },
          {
              type: "hads-3",
              content: "Definitely not so much now"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 7,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I feel restless as I have to be on the move",
      answers: [
          {
              type: "hads-1",
              content: "Very much indeed"
          },
          {
              type: "hads-2",
              content: "Quite a lot"
          },
          {
              type: "hads-3",
              content: "Not very much"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 8,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Worrying thoughts go through my mind",
      answers: [
          {
              type: "hads-1",
              content: "A great deal of the time"
          },
          {
              type: "hads-2",
              content: "A lot of the time"
          },
          {
              type: "hads-3",
              content: "From time to time, but not too often"
          },
          {
              type: "hads-4",
              content: "Only occasionally"
          },
      ],
      questionId: 9,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I look forward with enjoyment to things",
      answers: [
          {
              type: "hads-1",
              content: "As much as I ever did"
          },
          {
              type: "hads-2",
              content: "Rather less than I used to"
          },
          {
              type: "hads-3",
              content: "Definitely less than I used to"
          },
          {
              type: "hads-4",
              content: "Hardly at all"
          },
      ],
      questionId: 10,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I feel cheerful",
      answers: [
          {
              type: "hads-1",
              content: "Most of the time"
          },
          {
              type: "hads-2",
              content: "Sometimes"
          },
          {
              type: "hads-3",
              content: "Not often"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 11,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I get sudden feelings of panic",
      answers: [
          {
              type: "hads-1",
              content: "Very often indeed"
          },
          {
              type: "hads-2",
              content: "Quite often"
          },
          {
              type: "hads-3",
              content: "Not very often"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 12,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I can sit at ease and feel relaxed",
      answers: [
          {
              type: "hads-1",
              content: "Definitely"
          },
          {
              type: "hads-2",
              content: "Usually"
          },
          {
              type: "hads-3",
              content: "Not often"
          },
          {
              type: "hads-4",
              content: "Not at all"
          },
      ],
      questionId: 13,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "I can enjoy a good book or radio or TV program",
      answers: [
          {
              type: "hads-1",
              content: "Often"
          },
          {
              type: "hads-2",
              content: "Sometimes"
          },
          {
              type: "hads-3",
              content: "Not often"
          },
          {
              type: "hads-4",
              content: "Very seldom"
          },
      ],
      questionId: 14,
      surveytag: 'hads',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },
]

export default quizQuestions;
