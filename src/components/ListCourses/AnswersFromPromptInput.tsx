import { Card, Space, Input, Button } from "antd"
import { useState } from "react"
import { answersFromPrompt } from "../../services/client/AnswersFromPrompt"
import { FC } from "react"

const { TextArea } = Input

type AnswersFromPromptInputProps = {
  context?: string
}

export const AnswersFromPromptInput: FC<AnswersFromPromptInputProps> = ({
  context,
}) => {
  // Add new state for the query and the fetched answer
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState<string[]>([])

  // Create a function to handle the submission of the query
  const handleSubmitQuery = async () => {
    const fullQuery = context ? `${context}\n\n${query}` : query
    const apiResponse = await answersFromPrompt(fullQuery)
    const responseText = apiResponse.split("\n")
    setAnswer(responseText)
  }

  return (
    <div className="bg-white my-2 p-2 rounded-lg max-w-3xl flex flex-col gap-2 shadow-sm">
      <div className="flex flex-col gap-2 my-2 p-2 rounded-md border-2">
          <h3 className="border-spacing border-b-2 pb-1 mb-1">Ask A Question</h3>
          <TextArea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Get an answer..."
            className="rounded-md"
          />
          <Button onClick={handleSubmitQuery} className="w-fit rounded-md bg-sky-500 hover:bg-sky-400">
            <p className="text-white">Submit Query</p>
          </Button>
      </div>

      <div className="flex flex-col gap-2 my-2 p-2 rounded-md border-2">
        <h4 className="border-spacing border-b-2 pb-1 mb-1">Answer:</h4>
        <p className="">
          {answer.length > 0 ? answer : "No answer yet"}
        </p>
      </div>
    </div>
  )
}
