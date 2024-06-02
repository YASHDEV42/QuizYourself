import React from "react";
const Submit = ({ isSubmitting }) => {
  return (
    <button id="primary-btn" type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default Submit;
