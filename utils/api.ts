import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const correctMessageFromUser = (userMessage: string[], userCorrection: string[], setUserCorrection: Function) => {
  const message = userMessage[userMessage.length - 1];

  axios.post(`${URL}/correct_message`, {input: message, context: userMessage }).then((response) => {
    setUserCorrection([ ...userCorrection, response.data ])
  })
  .catch((error) => {
    console.error(error);
  });
}

export const translateMessageFromOpenAI = (userMessage: string[], openAITranslate: string[], setOpenAITranslate: Function) => {
  const message = userMessage[userMessage.length - 1];

  axios.post(`${URL}/translate_message`, {input: message}).then((response) => {
    setOpenAITranslate([ ...openAITranslate, response.data ])
  })
  .catch((error) => {
    console.error(error);
  });
}

export const getMessageFromOpenAI = async (
  message: string,
  setMessage: Function,
  openAIMessage: string[],
  setOpenAIMessage: Function,
) => {
  
  try {
    const response = await axios.post(`${URL}/message`, {input: message});
    if (response.data !== undefined) {
      setOpenAIMessage([ ...openAIMessage, response.data ]);
    }
    setMessage("");
  } catch (error) {
    console.error(error);
  }
}
