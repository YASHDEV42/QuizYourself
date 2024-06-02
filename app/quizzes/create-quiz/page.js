"use client";
import React, { useState, useEffect } from "react";
import { createQuiz } from "@/actions/create-quiz";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import Submit from "@/components/submitBtn";
const CreateQuizForm = () => {
  /*-------///////////////I am gonna break this code -------//////////////////*/
  /*Here I am generating a form server action*/
  const [formState, formAction] = useFormState(createQuiz, {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*Here I am using kinde api to get the user name */

  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  const [formData, setFormData] = useState(() => {
    let creatorName = "";
    if (user) {
      console.log("User:", user);
      creatorName = user.name;
    }
    return {
      title: "",
      questions: [{ question: "", answer: 0, choices: ["", "", "", ""] }],
      slug: "",
      creatorName: creatorName,
    };
  });

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = formData.questions.map((question, i) => {
      if (i === index) {
        return { ...question, [name]: value };
      }
      return question;
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      handleSlug(value); // Call handleSlug with the new title value
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");
    setFormData({ ...formData, slug: slug });
  };

  useEffect(() => {
    console.log("Slug updated:", formData.slug);
  }, [formData.slug]);

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", answer: 0, choices: ["", "", "", ""] },
      ],
    });
  };

  const handleChoiceChange = (e, index, choiceIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].choices[choiceIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAnswerChange = (e, index) => {
    const { value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].answer = parseInt(value);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set the submitting state to true
    console.log(isSubmitting);
    const updatedFormData = { ...formData };
    updatedFormData.questions = updatedFormData.questions.map((question) => ({
      ...question,
      choices: question.choices.join(", "),
    }));

    try {
      const quizCreationResult = await formAction(updatedFormData);
      if (quizCreationResult.success) {
        console.log("Quiz created");
        redirect("/profile");
      } else if (quizCreationResult.error) {
        formAction({ error: quizCreationResult.error });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); // Reset the submitting state regardless of the outcome
    }
  };

  const submitConfirmation = (e) => {
    e.preventDefault();
    if (window.confirm("Are You Sure You Want To Create This Quiz?")) {
      handleSubmit(e);
    }
  };
  if (isLoading)
    return (
      <section id="quiz-form">
        <h2>preparing...</h2>
      </section>
    );

  return (
    <section id="quiz-form">
      <h1>Create Your Quiz</h1>
      <form onSubmit={submitConfirmation} action={formAction} id="form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <div id="questionsFeild">
          {formData.questions.map((question, index) => (
            <div key={index}>
              <div id="questionTitle">
                <label>
                  Question {index + 1}:
                  <input
                    type="text"
                    name="question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(e, index)}
                  />
                </label>
              </div>
              <div id="choices">
                {question.choices.map((choice, choiceIndex) => (
                  <label key={choiceIndex}>
                    Choice {choiceIndex + 1} :
                    <input
                      id="choice"
                      type="text"
                      value={choice}
                      onChange={(e) =>
                        handleChoiceChange(e, index, choiceIndex)
                      }
                    />
                  </label>
                ))}
                <label>
                  Answer:
                  <select
                    value={question.answer}
                    onChange={(e) => handleAnswerChange(e, index)}
                  >
                    {question.choices.map((choice, choiceIndex) => (
                      <option key={choiceIndex} value={choiceIndex}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div>
          {formState.error && (
            <div className="error-messages">
              <ul>
                {formState.error.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Start buttons */}
        <div id="buttons">
          <button type="button" id="secondary-btn" onClick={addQuestion}>
            + Add Question
          </button>

          <Submit isSubmitting={isSubmitting} />
        </div>
        {/* End buttons */}
      </form>
    </section>
  );
};

export default CreateQuizForm;
