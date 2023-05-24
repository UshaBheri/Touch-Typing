// Touch Typing App without looking the keyboard

import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

const TouchTypingApp = () => {
  const [typedKeys, setTypedKeys] = useState("");
  const [typeNextKeys, setTypeNextKeys] = useState(0);
  const [pressedKeys, setPressedKeys] = useState(0);
  const [accuracy, setAccuracy] = useState(50);
  const [leftTime, setLeftTime] = useState(200);

  const expectedKeys = "asdfjkl;";

  const onChangeInput = (event) => {
    const enteredInput = event.target.value;
    setTypedKeys(enteredInput);
    setPressedKeys(enteredInput);
    calculateAccuracy(enteredInput);
  };

  const calculateAccuracy = (enteredInput) => {
    const keys = expectedKeys.slice(0, enteredInput.length);
    let matchedKeys = 0;
    for(let i = 0;i < enteredInput.length;i++){
        if(enteredInput[i] === keys[i]){
            matchedKeys++
        }
    }
  };

  const measuringAccuracyPercentage = (matchedKeys / enteredInput.length) * 100;
  setAccuracy(measuringAccuracyPercentage);

  useEffect(() => {
    if (leftTime > 0) {
      const timer = setInterval(() => {
        setLeftTime(leftTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  return (
    <div className="typing-container">
    <div className="container">
      <h1 className="main-heading">Touch Typing</h1>
      </div>
      <div className="next-key-container">
        <p className="next-keys">Next Key: {typeNextKeys}</p>
      </div>
      <div className="card-container">
        <p className="left-time">Left Time: {leftTime}</p>
        <p className="keys-pressed">Keys Pressed: {pressedKeys}</p>
        <p className="accuracy">Accuracy: {accuracy}</p>
      </div>
    </div>
    <div className="input-container">
        <input type="text" value={typedKeys} onChange={onChangeInput} />
    </div>
  );
};

export default TouchTypingApp;
