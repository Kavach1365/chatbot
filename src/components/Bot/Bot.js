import React, { useRef, useEffect, useState } from "react";
import "./Bot.css";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineHome } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import BotOutput from "./BotOutput";
const Bot = () => {
  const chatContainerRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const defaultQuestions = [
    "Hello How are you?",
    "What is tridosha ?",
    "What is my Prakriti ?",
    "What is the use of tridosha ?",
    "What is Ayurveda ?",
    "Are you a bot ?",
  ];

  const apiUrl = "http://localhost:5005/webhooks/rest/webhook";

  const history = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    if (jwtToken === undefined) {
      history("/login");
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const logout = () => {
    Cookies.remove("jwt_token");
    history("/login");
  };

  const postDataToApi = async (data) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
      return "Error: Unable to fetch bot response";
    }
  };

  const sendMessage = async () => {
    const message = userInput.trim();
    if (message !== "") {
      setChatHistory((chatHistory) => [
        ...chatHistory,
        { text: message, sender: "user" },
      ]);
      const botResponse = await getBotResponse(message);
      setChatHistory((chatHistory) => [...chatHistory, ...botResponse]);
      setUserInput("");
      console.log(chatHistory);
    }
  };

  const getBotResponse = async (message) => {
    const postData = {
      sender: "swapn",
      message,
    };
    const botResponse = await postDataToApi(postData);
    console.log(botResponse);
    const updatedBotResponse = botResponse.map((eachItem) => ({
      text: eachItem.text,
      sender: "bot",
    }));
    console.log(updatedBotResponse);
    return updatedBotResponse;
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      sendMessage();
    }
  }

  function handleBotOutput(chat) {
    return (
      <div key={uuidv4()} className="bot-chat">
        <img
          className="bot-icon"
          src="https://i.ibb.co/g9yVhnp/bot-icon.png"
          alt="bot"
        />
        <div className={`${chat.sender}`}>{chat.text}</div>
      </div>
    );
  }
  function handleUserOutput(chat) {
    return (
      <div key={uuidv4()} className="user-chat">
        <img
          className="user-icon"
          src="https://i.ibb.co/PrTgmJb/bot-icon-1.png"
          alt="user"
        />
        <div className={`${chat.sender}`}>{chat.text}</div>
      </div>
    );
  }

  function handleStartingState() {
    console.log("OKHBHKKJ");
    return (
      <div className="initail-state-container">
        {defaultQuestions.map((question) => (
          <div className="card">{question}</div>
        ))}
      </div>
    );
  }

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }

  return (
    <div className="outer-container">
      <div className="theme-bg-container">
        <Link to="/home">
          <div className="home-icon-bg-container">
            <MdOutlineHome className="home-icon" />
          </div>
        </Link>
        <FaArrowRightFromBracket onClick={logout} className="logout-button" />
      </div>
      <div className="bot-image-container">
        <h1>Ayumitra Chatbot</h1>
        <img
          src="https://i.ibb.co/mhDVKkp/bot-Design-1.png"
          alt="bot-design"
          className="bot-image"
        />
        <h1>Team Ayumitra</h1>
      </div>
      <div className="chat-container">
        {chatHistory.length === 0 ? (
          handleStartingState()
        ) : (
          <div className="chat-box" ref={chatContainerRef} id="chat-box">
            {chatHistory.map((chat, index) => {
              if (chat.sender === "bot") {
                return <BotOutput chat={chat} />;
              } else {
                return handleUserOutput(chat);
              }
            })}
          </div>
        )}
        <div className="input-bg-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Ayumitra..."
            onKeyDown={handleKeyPress}
          />
          <FaLocationArrow onClick={sendMessage} className="button" />
        </div>
      </div>
    </div>
  );
};

export default Bot;
