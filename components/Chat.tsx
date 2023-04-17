
import { useEffect, useState } from "react";
import UserMessage from './UserMessage';
import BotMessage from "./BotMessage";

import {
  correctMessageFromUser,
  translateMessageFromOpenAI,
  getMessageFromOpenAI,
} from "../utils/api";


const Chat = () => {

  const [ message, setMessage ] = useState<string>("")
  const [ userMessage, setUserMessage ] = useState<string[]>([])
  const [ userCorrection, setUserCorrection ] = useState<string[]>([])
  const [ openAIMessage, setOpenAIMessage ] = useState<string[]>([])
  const [ openAITranslate, setOpenAITranslate ] = useState<string[]>([])



  useEffect(() => {
    if (userMessage.length > 0) {
      correctMessageFromUser(userMessage, userCorrection, setUserCorrection);
    }
  }, [userMessage])

  useEffect(() => {
    if (openAIMessage.length > 0) {
      translateMessageFromOpenAI(openAIMessage, openAITranslate, setOpenAITranslate)
    }
  }, [openAIMessage])


  const handleMessage = () => {
    setUserMessage([...userMessage, message]);
    getMessageFromOpenAI(message, setMessage, openAIMessage, setOpenAIMessage)
  }


  const lastTranslate = openAITranslate[openAITranslate.length - 1];
  const lastCorrection = userCorrection[userCorrection.length - 1];


  console.log(userCorrection)

  return (
    <>
      <div className="chat">
      <h2>Conversation:</h2>
        <div className="container-chat">
          {userMessage.map((msg, index) => (
            <div className="container-double-message" key={index}>
              <UserMessage message={msg} correction={userCorrection[index]} />
              <BotMessage message={openAIMessage[index]} translate={openAITranslate[index]} />
            </div>
          ))}
        </div>
        <div className="container-input">
          <input
            className="input-user"
            placeholder="Enter your message"
            onChange={(event) => setMessage(event?.target.value)}
            value={message}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault(); 
                handleMessage();
              }
            }}
          />
          <button className="user-btn" type="submit" onClick={handleMessage}>send</button>
        </div>
      </div>
      <style jsx>
        {`
          .container-chat {
            height: 80vh;
            max-height: 80vh;
            overflow-y: scroll;
            padding: 0 20px;
          }
          .chat {
            display: flex;
            flex-direction: column;
            max-width: 800px;
            width: 100%;
	          box-shadow: 8px 8px 22px#c6c6c6;
}
          }
          .container-double-message {
            display: flex;
            flex-direction: column;
            z-index: 100;
          }
          .container-input {
            display: flex;
            justify-content: center;
            padding: 10px;
          }
          .input-user {
            width: 460px;
            height: 30px;
            border-radius: 6px;
            padding-left: 10px;
            border: 1px solid black;
          }
          .user-btn {
            width: 100px;
            margin-left: 20px;
          }
        
        `}
      </style>
    </>
  )
}

export default Chat;