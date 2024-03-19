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
          link: "https://www.youtube.com/embed/EUhQ8h9IzF8?si=g5zOITl5MTgOMAZK",
          title: "How To Cope With Panic Attacks",
        },
        {
          link: "https://www.youtube.com/embed/wR8oKZ5qTfk?si=AM0n3xOdQ8zv1qk1",
          title: "How to Stop Panic Attacks Part",
        },
      ],
    },
    {
      question: "Have your moods been noticeably changing frequently?",
      type: "Yes/No",
      category: [
        {
          link: "https://www.youtube.com/embed/NE56XyroZY4?si=EUQnjHCa_hKimAqt",
          title: "Ease the Head Pain",
        },
        {
          link: "https://www.youtube.com/embed/K2LnW1gF6Eg?si=fH2aY4G_AcCSa05j",
          title: "Yoga for Mood Swings",
        },
        {
          link: "https://www.youtube.com/embed/6mZP1GORRC8?si=aqguQUTFrc5xC1F2",
          title: "Ways to Prevent Frequent Mood Fluctuations ",
        },
      ],
    },
    {
      question: "Have you been feeling depressed lately?",
      type: "Yes/No",
      category: [
        {
          link: "https://www.youtube.com/embed/MjMkBaqimFo?si=kAB-E9OfQ88yVbd1",
          title: "Emotional Benefits of Exercise ",
        },
        {
          link: "https://www.youtube.com/embed/Sxddnugwu-8?si=JGw81RtWTZEZdg2f",
          title: "Yoga For Depression ",
        },
        {
          link: "https://www.youtube.com/embed/sFtP0HWvu0k?si=K7DmV_c2y4WYPwdW",
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
          link: "https://www.youtube.com/embed/3u5zpVnMLkw?si=SYUf3uTRCaZ1Eiej",
          title: " Headache Relief ",
        },
        {
          link: "https://www.youtube.com/embed/9RavVoZ5MAw?si=R5PN19eNNPsosDM6",
          title: "10 Minute Headache relief music ",
        },
        {
          link: "https://www.youtube.com/embed/8-qIoavXiOA?si=V515q87-t-kdjHz1",
          title: "Anxiety Headache Relief",
        },
      ],
    },
    {
      question: "Have you been experiencing a lack of calmness recently?",
      type: "Yes/No",
      category: [
        {
          link: "https://www.youtube.com/embed/sm0i1Y4g_zA?si=Qpuuv_Fn62XZCfHU",
          title: "How To Be Calm and Peaceful Within ",
        },
        {
          link: "https://www.youtube.com/embed/nlEoLYREbXo?si=KXzOZL8f-08x3_A5",
          title: "Clear Your Mind, 5 Minute Meditation ",
        },
        {
          link: "https://www.youtube.com/embed/AYoeex2ReXQ?si=-IJTZIdvGV7akSE0",
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
