import { useState } from "react";



interface UserMessageProps {
  message: string;
  correction: string;
}

const UserMessage = ({ message, correction }: UserMessageProps) => {

  const [ showCorrection, setShowCorrection ] = useState<boolean>(false)

  return(
    <>
      <div className="container-message">
        <div className="user text" onClick={() => setShowCorrection(!showCorrection)}>
          {message}
        </div>
        <div className="correction text">
          {correction}
        </div>
      </div>
      <style jsx>
        {`
          .container-message {
            display: flex;
            flex-direction: row;
          }
          .text {
            margin: 10px 0;
            padding: 10px;
            border-radius: 8px;
            align-self: start;
            max-width: 380px;
            height: fit-content;
            box-shadow: 8px 8px 22px#c6c6c6;
          }
          .user {
            background-color: #f8f8ff;
          }
          
          .correction {
            display: ${showCorrection ? 'flex' : 'none'};
            background-color: #aaffa2;
            margin-left: 20px;
          }
          
        
        `}
      </style>
    </>

  )
}

export default UserMessage;