import { useState, useEffect } from "react";
import { OpenAIApi, Configuration } from "openai"

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY_API,
});

const openai = new OpenAIApi(configuration);

const useOpenAI = () => {
  const [chatGPTAnswer, setChatGPTAnswer] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
          {"role": "system", "content": "you are a human."},
          {"role": "user", "content": "Salut, Comment vas tu?"}, 
        ]
      });
      const messageContent = completion.data.choices[0].message?.content;
      if (messageContent && typeof messageContent === "string") {
        const newChatGPTAnswer = [...chatGPTAnswer, messageContent];
        setChatGPTAnswer(newChatGPTAnswer);
      }
    }
    fetchData()
  }, [])
  return chatGPTAnswer
}


export default function Home() {

  const chatGPTAnswer = useOpenAI()

  console.log(chatGPTAnswer)



  return (
    <main>
      {chatGPTAnswer.map(message => {
        return(
          <div style={{marginTop: '50px' }}>
            {message}
          </div>
        )
      })}
    </main>
  )
}
