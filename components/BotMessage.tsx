import { useState } from "react";


interface BotMessageProps {
  message: string;
  translate: string;
}

const BotMessage = ({ message, translate }: BotMessageProps) => {

  const [ showTranslation, setShowTranslation ] = useState<Boolean>(false);


  return(
    <>
      <div className="container-message">
        <div className="translation text">
          {translate}
        </div>
        <div className="bot text" onClick={() => setShowTranslation(!showTranslation)}>
          {message ? message : 'writing...'}
        </div>

      </div>
      <style jsx>
        {`
          .container-message {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: end;

          }
          .text {
            margin: 10px 0;
            padding: 10px;
            border-radius: 8px;
            max-width: 380px;
            height: fit-content;
            box-shadow: 8px 8px 22px#c6c6c6;
          }
          .bot {
            background-color: #f5fff5;
          }
          
          .translation {
            display: ${showTranslation ? 'flex' : 'none'};
            background-color: #b3b8ff;
            margin-right: 20px;
          }
          
        
        `}
      </style>
    </>

  )
}

export default BotMessage;