import { Configuration, OpenAIApi } from "openai"

const OPENAI_KEY = process.env.OPENAI_KEY
const STAGE = process.env.STAGE

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
})
const openai = new OpenAIApi(configuration)

export async function getCompletion(req: any) {
  const { prompt, ...options } = req
  if (STAGE === "PROD") {
    return await openai.createCompletion({ prompt, ...options })
  } else {
    // Return a mock response in the development environment
    return {
      data: {
        choices: [
          {
            text: `This is a mock response for the development environment. Prompt: ${prompt}`,
          },
        ],
      },
    }
  }
}
