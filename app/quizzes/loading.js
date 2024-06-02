"use client";
import React from "react";
import { useState } from "react";
const Loading = () => {
  const [counter, setCounter] = useState(0);
  setTimeout(() => {
    if (counter === 3) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
    console.log(".");
  }, 500);
  return (
    <section>
      <div id="contianer">
        {counter === 0 && <h3>Loading</h3>}
        {counter === 1 && <h3>Loading.</h3>}
        {counter === 2 && <h3>Loading..</h3>}
        {counter === 3 && <h3>Loading...</h3>}
      </div>
    </section>
  );
};

export default Loading;
