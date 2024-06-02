"use client";
import React from "react";
import { deleteQuiz } from "@/actions/delete-quiz";
import { useState } from "react";
const DeleteButton = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteQuizHandler = async () => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    if (!id) {
      console.error("Quiz ID is required for deletion.");
      return;
    }
    console.log("Deleting quiz:", id);
    const result = await deleteQuiz(id);
    if (result.deletedCount === 1) {
      console.log("Quiz deleted:", result.message);

      window.location.reload();
      setIsDeleting(false);
    } else {
      console.error("Failed to delete the quiz:", result.message);
      alert("Failed to delete the quiz");
    }
  };
  const deleteQuizConfirm = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuizHandler();
    }
  };
  return (
    <>
      {isDeleting ? (
        <button
          onClick={deleteQuizHandler}
          disabled={isDeleting}
          style={{
            cursor: "not-allowed",
            backgroundColor: "#ccc",
            color: "#777",
            border: "1px solid #ccc",
          }}
        >
          Deleting...
        </button>
      ) : (
        <button onClick={deleteQuizConfirm} style={{ cursor: "pointer" }}>
          Delete
        </button>
      )}
    </>
  );
};

export default DeleteButton;
