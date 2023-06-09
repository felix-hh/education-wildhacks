import { getCompletion } from "../resources/OpenAI"

export async function getAnswerFromPrompt(query: string): Promise<string> {
  const prompt = `Based on the question: '${query}' give an answer`

  try {
    const response: any = await getCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
    })

    const apiResponse = response.data.choices[0].text.trim()
    return apiResponse
  } catch (error) {
    console.error("Error getting answer:", error)
    return ""
  }
}
