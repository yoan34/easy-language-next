import { useState, useEffect, useCallback } from "react";
import { OpenAIApi, Configuration } from "openai"

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY_API,
});

const openai = new OpenAIApi(configuration);



export const useOpenAI = () => {
  const fetchChatGPTAnswer = useCallback(async (message: string) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:[
        {"role": "system", "content": "you are a human."},
        {"role": "user", "content": message}, 
      ]
    });
    const messageContent = completion.data.choices[0].message?.content;
    if (messageContent && typeof messageContent === "string") {
    }
    return messageContent
  }, [])

  return fetchChatGPTAnswer
}