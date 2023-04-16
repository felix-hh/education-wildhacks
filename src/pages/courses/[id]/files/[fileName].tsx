import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AnswersFromPromptInput } from "../../../../components/ListCourses/AnswersFromPromptInput"
import { answersFromPrompt } from "../../../../services/client/AnswersFromPrompt"
import { getFileData } from "../../../../services/client/GetFile"
import { File } from "../../../../model/DataModel"

const LecturePage = () => {
  const router = useRouter()
  const { id: courseId, fileName } = router.query

  const [userFiles, setUserFiles] = useState<File | null>(null)
  const [summary, setSummary] = useState("")

  useEffect(() => {
    if (courseId && fileName) {
      const fetchLectureData = async () => {
        const { fileData } = await getFileData(
          courseId as string,
          fileName as string
        )
        setUserFiles(fileData)
        await fetchLectureSummary(fileData.data)
      }
      fetchLectureData()
    }
  }, [courseId, fileName])

  const fetchLectureSummary = async (data: string) => {
    const prompt = `Please summarize the following speech-to-text data of a lecture. Note that the dataion might have some inaccuracies. Here is the data:\n\n${data}\n\nSummary: `
    const apiResponse = await answersFromPrompt(prompt)
    setSummary(apiResponse)
  }

  if (!userFiles) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-2 mx-auto h-full">
      <h1>{userFiles.name}</h1>
      <div className="bg-white my-2 p-2 rounded-lg max-w-3xl">
        <p>
          <strong>Date:</strong> {userFiles.date}
        </p>
        <p>
          <strong>Original:</strong> {userFiles.data}
        </p>
        <br></br>
        <p>
          <strong>Summary:</strong>
        </p>
        <p>{summary}</p>
      </div>
      <AnswersFromPromptInput
        context={`Original: ${userFiles.data}\n\nSummary: ${summary}\n\nUse the information in the Original and Summary sections to answer the query\n\n`}
      />
    </div>
  )
}

export default LecturePage
