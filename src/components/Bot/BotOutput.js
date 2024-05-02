import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function BotOutput(props) {
  const { chat } = props;
  const { text } = chat;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer;
    let i = 0;
    timer = setInterval(() => {
      if (i < chat.text.length) {
        setDisplayedText(text.slice(0, i + 1) + "...");
        i++;
      } else {
        setDisplayedText(text);
        clearInterval(timer);
      }
    }, 30); // Adjust the delay between each character if needed
    return () => clearInterval(timer);
  }, [chat.text]);

  return (
    <div key={uuidv4()} className="bot-chat">
      <img
        className="bot-icon"
        src="https://i.ibb.co/g9yVhnp/bot-icon.png"
        alt="bot"
      />
      <div className={`${chat.sender}`}>{displayedText}</div>
    </div>
  );
}

export default BotOutput;
