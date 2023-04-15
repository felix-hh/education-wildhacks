import axios from "axios"
import { AnswerFromPromptResponse } from "../../model/DataModel"

export const answersFromPrompt = async (prompt: string): Promise<string> => {
  const request = { prompt }
  const response = await axios.post("/api/answersFromPrompt", request)
  const json: AnswerFromPromptResponse = response.data
  const modelResponse = json.modelResponse
  return modelResponse
}
