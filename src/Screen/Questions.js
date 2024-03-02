import React, { useState } from "react";

const Questions = (props) => {
  const [responses, setResponses] = useState({});

  const handleCheckboxChange = (question, isChecked) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: isChecked,
    }));
  };
  const questions = [
    {
      question:
        "Is there any change in your sleep pattern, appetite, or energy level?",
      type: "Yes/No",
      category: "",
    },
    {
      question:
        "Have you been consistently feeling anxious or overwhelmed lately?",
      type: "Yes/No",
      category: "",
    },
    {
      question:
        "Have you had sudden moments of intense fear or panic recently?",
      type: "Yes/No",
      category: "",
    },
    {
      question: "Have your moods been noticeably changing frequently?",
      type: "Yes/No",
      category: "",
    },
    {
      question: "Have you been feeling depressed lately?",
      type: "Yes/No",
      category: "",
    },
    {
      question:
        "Do you experience physical symptoms such as tension or headaches when stressed?",
      type: "Yes/No",
      category: "",
    },
    {
      question: "Have you been experiencing a lack of calmness recently?",
      type: "Yes/No",
      category: "",
    },
  ];
  const category = {
    "": "",
  };
  return (
    <div>
      <h2>Questionnaire</h2>
      <form>
        {questions.map((q) => (
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
                  handleCheckboxChange(q.question, e.target.checked)
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
