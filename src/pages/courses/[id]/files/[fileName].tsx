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
        await fetchLectureSummary(fileData.transcript)
      }
      fetchLectureData()
    }
  }, [courseId, fileName])

  const fetchLectureSummary = async (transcript: string) => {
    const prompt = `Please summarize the following speech-to-text transcript of a lecture. Note that the transcription might have some inaccuracies. Here is the transcript:\n\n${transcript}\n\nSummary: `
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
          <strong>Transcript:</strong> {userFiles.transcript}
        </p>
        <br></br>
        <p>
          <strong>Summary:</strong>
        </p>
        <p>{summary}</p>
      </div>
      <AnswersFromPromptInput
        context={`Transcript: ${userFiles.transcript}\n\nSummary: ${summary}\n\nUse the information in the Transcript and Summary sections to answer the query\n\n`}
      />
    </div>
  )
}

export default LecturePage
