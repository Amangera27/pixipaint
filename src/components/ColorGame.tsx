import React, { useState, useEffect, useRef } from 'react';

interface ColorGameProps {
  onBack: () => void;
  onEarnStars: (count: number) => void;
}

interface Question {
  text: string;
  colors: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
}

const GAME_QUESTIONS: Question[] = [
  {
    text: "What happens when you mix Red 🔴 and Yellow 🟡?",
    colors: ["#ff4d6d", "#ffd166"],
    options: ["Orange 🟠", "Green 🟢", "Purple 🟣"],
    correctIndex: 0,
    explanation: "Red and Yellow mix to make bright Orange!"
  },
  {
    text: "What happens when you mix Blue 🔵 and Yellow 🟡?",
    colors: ["#118ab2", "#ffd166"],
    options: ["Pink 🌸", "Green 🟢", "Orange 🟠"],
    correctIndex: 1,
    explanation: "Blue and Yellow mix to make lively Green!"
  },
  {
    text: "What happens when you mix Red 🔴 and Blue 🔵?",
    colors: ["#ff4d6d", "#118ab2"],
    options: ["Purple 🟣", "Brown 🐻", "Yellow 🟡"],
    correctIndex: 0,
    explanation: "Red and Blue combine to create royal Purple!"
  },
  {
    text: "Combine three primary colors! Red 🔴 + Yellow 🟡 + Blue 🔵 = ?",
    colors: ["#ff4d6d", "#ffd166", "#118ab2"],
    options: ["Green 🟢", "Sky Blue 💧", "Brown 🐻"],
    correctIndex: 2,
    explanation: "Mixing all three primary colors gives you earthy Brown!"
  },
  {
    text: "Which color must mix with Red 🔴 to create a Purple Grape 🍇?",
    colors: ["#ff4d6d", "#ffffff"],
    options: ["Green 🟢", "Blue 🔵", "Yellow 🟡"],
    correctIndex: 1,
    explanation: "Mixing Red and Blue gives you Purple!"
  },
  {
    text: "Mix three magical colors: Blue 🔵 + Yellow 🟡 + White ⚪?",
    colors: ["#118ab2", "#ffd166", "#ffffff"],
    options: ["Light Green 🥬", "Dark Purple 🍇", "Orange Juice 🍊"],
    correctIndex: 0,
    explanation: "Blue and Yellow make Green, and adding White makes it a gorgeous Light Green!"
  }
];

export const ColorGame: React.FC<ColorGameProps> = ({ onBack, onEarnStars }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'wrong-popup' | 'won'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(3.0); // 3 seconds total with decimals for smooth animation
  const [wrongExplanation, setWrongExplanation] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Starts the timer for each question
  useEffect(() => {
    if (gameState !== 'playing') return;

    setTimeLeft(3.0);
    setSelectedOption(null);

    const intervalMs = 50; // update every 50ms for smooth bar shrinking
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.05) {
          clearInterval(timerRef.current!);
          handleAnswerSelect(-1); // Timeout acts as a wrong answer
          return 0;
        }
        return prev - 0.05;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, gameState]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(optionIndex);

    const question = GAME_QUESTIONS[currentQuestionIndex];

    if (optionIndex === question.correctIndex) {
      // Correct answer! Proceed to next question or win after a small reward delay
      setTimeout(() => {
        if (currentQuestionIndex + 1 < GAME_QUESTIONS.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setGameState('won');
          onEarnStars(10); // Reward 10 stars!
        }
      }, 1000);
    } else {
      // Wrong answer or Timeout! Show warning popup modal
      setWrongExplanation(
        optionIndex === -1 
          ? `Time's up! ⏰ Remember: ${question.explanation}` 
          : `Not quite! 🎨 Remember: ${question.explanation}`
      );
      setGameState('wrong-popup');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setGameState('playing');
  };

  const activeQuestion = GAME_QUESTIONS[currentQuestionIndex];

  return (
    <div className="color-game-overlay">
      <div className="color-game-container">
        
        {/* Intro Screen */}
        {gameState === 'intro' && (
          <div className="color-game-card game-intro-card">
            <span className="game-intro-emoji">🏆🎮</span>
            <h2>Color Guess Game!</h2>
            <p className="game-subtitle">Who Wants to Be a Millionaire: Kids Edition! 🌈</p>
            
            <div className="game-rules-box">
              <h4>📜 Rules of the Game:</h4>
              <ul>
                <li>⏰ You have exactly <strong>3 seconds</strong> to answer each question!</li>
                <li>🎨 <strong>6 magical color theory questions</strong> will be asked.</li>
                <li>🌟 Answer all questions correctly to win <strong>10 Shiny Stars</strong>!</li>
              </ul>
            </div>

            <div className="intro-actions">
              <button className="control-btn-pill cancel-btn bouncy-btn" onClick={onBack}>
                ◀ Back to Menu
              </button>
              <button className="control-btn-pill accent-btn play-btn bouncy-btn" onClick={() => setGameState('playing')}>
                Start Game! 🚀
              </button>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && activeQuestion && (
          <div className="color-game-card game-playing-card">
            {/* Header progress info */}
            <div className="game-playing-header">
              <span className="game-step-badge">Question {currentQuestionIndex + 1} of 6</span>
              <button className="game-exit-btn" onClick={onBack} title="Exit Game">❌</button>
            </div>

            {/* Timer visual progress bar */}
            <div className="game-timer-container">
              <div 
                className="game-timer-bar" 
                style={{ 
                  width: `${(timeLeft / 3.0) * 100}%`,
                  backgroundColor: timeLeft > 1.0 ? 'var(--color-success)' : '#ff4d6d' 
                }}
              />
              <span className="game-timer-text">⏰ {timeLeft.toFixed(1)}s</span>
            </div>

            {/* Question Text */}
            <h3 className="game-question-text">{activeQuestion.text}</h3>

            {/* Color Combination Bubbles Display */}
            <div className="game-color-combo-row">
              {activeQuestion.colors.map((color, index) => (
                <React.Fragment key={index}>
                  <div 
                    className="game-color-bubble" 
                    style={{ backgroundColor: color }}
                  />
                  {index < activeQuestion.colors.length - 1 && (
                    <span className="game-combo-plus">➕</span>
                  )}
                </React.Fragment>
              ))}
              <span className="game-combo-equals">＝</span>
              <div className="game-color-bubble bubble-question-mark">❓</div>
            </div>

            {/* Multi-choice Options Grid */}
            <div className="game-options-grid">
              {activeQuestion.options.map((option, idx) => {
                let btnClass = "";
                if (selectedOption !== null) {
                  if (idx === activeQuestion.correctIndex) btnClass = "btn-correct";
                  else if (idx === selectedOption) btnClass = "btn-wrong";
                  else btnClass = "btn-disabled";
                }

                return (
                  <button
                    key={idx}
                    className={`game-option-btn bouncy-btn ${btnClass}`}
                    onClick={() => selectedOption === null && handleAnswerSelect(idx)}
                    disabled={selectedOption !== null}
                  >
                    <span className="option-letter">{idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}:</span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wrong/Timeout Popup screen */}
        {gameState === 'wrong-popup' && (
          <div className="color-game-card game-popup-card">
            <span className="popup-emoji">😢</span>
            <h2>Do not worry!</h2>
            <p className="popup-motivational">Every mistake is a chance to learn more about colors! 🎨✨</p>
            
            <div className="explanation-bubble">
              <h4>💡 Learning Hint:</h4>
              <p>{wrongExplanation}</p>
            </div>

            <div className="popup-actions">
              <button className="control-btn-pill cancel-btn bouncy-btn" onClick={onBack}>
                Back to Menu
              </button>
              <button className="control-btn-pill accent-btn bouncy-btn" onClick={handleRestart}>
                Try Again 🔄
              </button>
            </div>
          </div>
        )}

        {/* Won Screen */}
        {gameState === 'won' && (
          <div className="color-game-card game-won-card">
            <span className="won-emoji">🏆🥳🎉</span>
            <h2>You are a Millionaire!</h2>
            <p className="won-congrats">You answered all 6 color theory questions correctly like a true Master Artist! 👑🎨</p>

            <div className="reward-chest">
              <span className="reward-stars-animation">⭐🌟⭐</span>
              <h3>+10 Stars Reward!</h3>
              <p>Stars added to your active kid profile. Use them to unlock awesome premium templates! 🦊🔑</p>
            </div>

            <button className="control-btn-pill accent-btn claim-btn bouncy-btn" onClick={onBack}>
              Claim Stars & Go Back 🎁
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
