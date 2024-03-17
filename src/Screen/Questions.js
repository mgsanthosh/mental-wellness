import React, { useState } from "react";

const Questions = ({ updateQuestions }) => {
  const [responses, setResponses] = useState({});

  const [questionsList, setQuestionList] = useState([
    {
      question:
        "Is there any change in your sleep pattern, appetite, or energy level?",
      type: "Yes/No",
      category: [
        {
          link: "https://www.youtube.com/embed/mhZ4jLpTYEk",
          title: "Asleep fast",
        },
        {
          link: "https://www.youtube.com/embed/r6ob3honOHg",
          title: " Tips to Sleep Well ",
        },
        {
          link: "https://www.youtube.com/embed/VtLXhYc06rw",
          title: "Food Habits",
        },
      ],
    },
    {
      question:
        "Have you been consistently feeling anxious or overwhelmed lately?",
      type: "Yes/No",
      category: [
        {
          link: "https://www.youtube.com/embed/iqcAWup2aCE",
          title: "Yoga To Treat Anxiety",
        },

        {
          link: "https://www.youtube.com/embed/lHVYgnlukTw",
          title: " 5 Ways to Deal with Anxiety ",
        },
      ],
    },
    {
      question:
        "Have you had sudden moments of intense fear or panic recently?",
      type: "Yes/No",
      category: [
        {
          link: "https://youtu.be/EUhQ8h9IzF8?si=sILq7B0R3GSFG55A",
          title: "How To Cope With Panic Attacks",
        },
        {
          link: "https://youtu.be/wR8oKZ5qTfk?si=uKeZyg59vuqXHb4k",
          title: "How to Stop Panic Attacks Part",
        },
      ],
    },
    {
      question: "Have your moods been noticeably changing frequently?",
      type: "Yes/No",
      category: [
        {
          link: "https://youtu.be/NE56XyroZY4?si=9IJsF_yTQsMOKncF",
          title: "Ease the Head Pain",
        },
        {
          link: "https://youtu.be/K2LnW1gF6Eg?si=EDXh_aOovQzsiMaw",
          title: "Yoga for Mood Swings",
        },
        {
          link: "https://youtu.be/6mZP1GORRC8?si=rh-RSLmWG3qagks2",
          title: "Ways to Prevent Frequent Mood Fluctuations ",
        },
      ],
    },
    {
      question: "Have you been feeling depressed lately?",
      type: "Yes/No",
      category: [
        {
          link: "https://youtu.be/MjMkBaqimFo?si=A1qTPquH9urZN0iB",
          title: "Emotional Benefits of Exercise ",
        },
        {
          link: "https://youtu.be/Sxddnugwu-8?si=a2L2N37tVW06fu--",
          title: "Yoga For Depression ",
        },
        {
          link: "https://youtu.be/sFtP0HWvu0k?si=z5u8jrvWft6SJxrZ",
          title: "Exercise for Depression",
        },
      ],
    },
    {
      question:
        "Do you experience physical symptoms such as tension or headaches when stressed?",
      type: "Yes/No",
      category: [
        {
          link: "https://youtu.be/3u5zpVnMLkw?si=DvW92DD569fsiUSy",
          title: " Headache Relief ",
        },
        {
          link: "https://youtu.be/9RavVoZ5MAw?si=S7trmAS3AG8K96yt",
          title: "10 Minute Headache relief music ",
        },
        {
          link: "https://youtu.be/8-qIoavXiOA?si=o9K1soVh6PucZpyi",
          title: "Anxiety Headache Relief",
        },
      ],
    },
    {
      question: "Have you been experiencing a lack of calmness recently?",
      type: "Yes/No",
      category: [
        {
          link: "https://youtu.be/sm0i1Y4g_zA?si=mRDU16pMO6xwViwQ",
          title: "How To Be Calm and Peaceful Within ",
        },
        {
          link: "https://youtu.be/nlEoLYREbXo?si=dM4yWJP1r0zZOkQi",
          title: "Clear Your Mind, 5 Minute Meditation ",
        },
        {
          link: "https://youtu.be/AYoeex2ReXQ?si=tE78UPCwmk-NNkad",
          title: "10 Minute Calming Yoga ",
        },
      ],
    },
  ]);

  const handleCheckboxChange = (question, isChecked, index, questions) => {
    console.log("The Question ", question);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question.question]: isChecked,
    }));
    // if (isChecked) {
    //   const selectedCategories = question.category.map((cat) => ({
    //     link: cat.link,
    //     title: cat.title,
    //   }));
    //   console.log("Selected Categories:", selectedCategories);
    // }
    if (isChecked) {
      questions[index]["isSelected"] = true;
    } else {
      questions[index]["isSelected"] = false;
    }
    console.log("The QUESTIONS ", questions);
    // Update the state
    setQuestionList([...questions]);
    // Pass the updated questions list to the parent component
    updateQuestions([...questions]);
  };
  return (
    <div>
      <h2>Questionnaire</h2>
      <form>
        {questionsList.map((q, index) => (
          <div key={q.question} style={{ margin: "20px" }}>
            <label
              style={{
                color: "#513d87",
                fontSize: "20px",
                fontWeight: "500",
                margin: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={responses[q.question] || false}
                onChange={(e) =>
                  handleCheckboxChange(
                    q,
                    e.target.checked,
                    index,
                    questionsList
                  )
                }
              />
              {q.question}
            </label>
          </div>
        ))}
      </form>
      {/* <div>
        <h3>Responses:</h3>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Questions;
