import React, { useState, useRef } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHandHoldingHeart,
  faUserFriends,
  faHandshake,
  faUser,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useWindowSize } from "react-use";

const flamesResults = {
  F: {
    label: "Friend",
    icon: faUserFriends,
    color: "#42a5f5",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kc3xlbnwwfHwwfHx8MA%3D%3D)",
  },
  L: {
    label: "Lover",
    icon: faHeart,
    color: "#f44336",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1461009209120-103a8f970745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG92ZXJzfGVufDB8fDB8fHww)",
  },
  A: {
    label: "Affectionate",
    icon: faHandHoldingHeart,
    color: "#ff9800",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1541929705169-6860cb5b1de5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFmZmVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D)",
  },
  M: {
    label: "Marriage",
    icon: faHandshake,
    color: "#4caf50",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1541538670337-c53313ad7c00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fG1hcnJpYWdlfGVufDB8fDB8fHww)",
  },
  E: {
    label: "Enemy",
    icon: faShieldAlt,
    color: "#ff1744",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1646640237345-0c72cd23045a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5lbXl8ZW58MHx8MHx8fDA%3D)",
  },
  S: {
    label: "Sister",
    icon: faUser,
    color: "#9c27b0",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1520891601894-dedf729f78f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2lzdGVyfGVufDB8fDB8fHww)",
  },
};

function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { width, height } = useWindowSize();

  // Ref for fireworks animation
  const confettiRef = useRef(null);

  const getInstance = (instance) => {
    confettiRef.current = instance;
  };

  const startFireworks = () => {
    confettiRef.current &&
      confettiRef.current({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
      });
  };

  const calculateFlames = () => {
    // Clear previous error
    setError("");

    // Validate if names are entered
    if (!name1 || !name2) {
      setError("Please enter both names.");
      return;
    }

    const flames = "FLAMES";
    let combinedNames =
      name1.toLowerCase().replace(/\s+/g, "") +
      name2.toLowerCase().replace(/\s+/g, "");
    let uniqueLetters = combinedNames
      .split("")
      .filter((char, index, self) => self.indexOf(char) === index);
    const remainingCount = combinedNames.length - uniqueLetters.length;

    const flamesIndex = remainingCount % flames.length;
    const flamesLetter = flames[flamesIndex];
    setResult(flamesResults[flamesLetter]);

    // Trigger fireworks if the result is "Lover" or "Marriage"
    if (flamesLetter === "L" || flamesLetter === "M") {
      startFireworks();
    }
  };

  return (
    <div
      className="app-container"
      style={
        result
          ? {
              backgroundColor: result.color,
              backgroundImage: result.backgroundImage,
            }
          : {}
      }
    >
      {result && (result.label === "Lover" || result.label === "Marriage") && (
        <>
          {/* Confetti Animation */}
          <Confetti width={width} height={height} />
          {/* Fireworks Animation */}
          <ReactCanvasConfetti refConfetti={getInstance} />
        </>
      )}
      <div className="content">
        <h1>FLAMES Game</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter partner's name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>

        {/* Display error message if validation fails */}
        {error && <p className="error-message">{error}</p>}

        <button onClick={calculateFlames} className="calculate-btn">
          Check FLAMES
        </button>

        {result && (
          <div className="result-container">
            <h2>
              <FontAwesomeIcon icon={result.icon} /> {result.label}
            </h2>
            <p>The result is {result.label}!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
