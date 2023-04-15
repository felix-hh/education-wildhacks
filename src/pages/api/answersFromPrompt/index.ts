import type { NextApiRequest, NextApiResponse } from "next"
import { AnswerFromPromptResponse } from "../../../model/DataModel"
import { getAnswerFromPrompt } from "../../../services/server/ServerAnswersFromPrompt"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AnswerFromPromptResponse>
) => {
  const { prompt } = req.body

  const modelResponse = await getAnswerFromPrompt(prompt)

  res.status(200).json({ modelResponse })
}

export default handler
