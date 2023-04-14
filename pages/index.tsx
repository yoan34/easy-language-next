
import { useOpenAI } from "@/utils/api";
import { useState } from "react";
import { Message } from '../components/Message';


export default function Home() {

  const [ message, setMessage ] = useState<string>("")
  
  const [ userMessage, setUserMessage ] = useState<string[]>([])
  const [ openAIMessage, setOpenAIMessage ] = useState<string[]>([])
  const fetchChatGPTAnswer = useOpenAI()


  const handleSend = async () => {
    const answer = await fetchChatGPTAnswer(message);
    console.log(answer)
    setUserMessage([...userMessage, message]);
    if (answer !== undefined) {
      setOpenAIMessage([...openAIMessage, answer]);
    }
    setMessage("");
  }


  return (
    <main>
      <div>
        <h2>Conversation:</h2>
        {userMessage.map((msg, index) => (
          <div key={index}>
            <Message user={true} message={msg} />
            <Message user={false} message={openAIMessage[index]} />
          </div>
        ))}
      </div>
      <div>
        <label>Message: </label>
        <input onChange={(event) => setMessage(event?.target.value)} value={message} />
        <button type="submit" onClick={handleSend}>send</button>
      </div>
    </main>
  )
}
