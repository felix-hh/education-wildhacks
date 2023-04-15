import { Card, Space, Input, Button } from "antd"
import { useState } from "react"
import { answersFromPrompt } from "../../services/client/AnswersFromPrompt"
import { FC } from "react"

const { TextArea } = Input

type AnswersFromPromptInputProps = Record<string, never>

export const AnswersFromPromptInput: FC<AnswersFromPromptInputProps> = () => {
  // Add new state for the query and the fetched answer
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState<string[]>([])

  // Create a function to handle the submission of the query
  const handleSubmitQuery = async () => {
    const apiResponse = await answersFromPrompt(query)
    const responseText = apiResponse.split("\n")
    setAnswer(responseText)
  }

  return (
    <>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <TextArea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Get an answer..."
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <Button onClick={handleSubmitQuery} type="primary">
            Submit Query
          </Button>
        </Space>
      </Card>

      <Card title="Answer">
        {answer.length > 0 ? answer : <p>No answer yet</p>}
      </Card>
    </>
  )
}
