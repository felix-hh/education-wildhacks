// pages/courses/[courseId]/lectures/[lecture-name].tsx
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AnswersFromPromptInput } from "../../../../components/ListCourses/AnswersFromPromptInput"
import { getLectureData } from "../../../../services/client/GetLecture"
import { answersFromPrompt } from "../../../../services/client/AnswersFromPrompt"
import { Assignment } from "../../../../model/DataModel"
import { getAssignmentData } from "../../../../services/client/GetAssignment"

const LecturePage = () => {
  const router = useRouter()
  const { id: courseId, assignmentName } = router.query

  const [assignment, setLecture] = useState<Assignment | null>(null)
  const [summary, setSummary] = useState("")

  useEffect(() => {
    if (courseId && assignmentName) {
      const fetchLectureData = async () => {
        const { assignmentData } = await getAssignmentData(
          courseId as string,
          assignmentName as string
        )
        setLecture(assignmentData)
        await fetchLectureSummary(assignmentData.data)
      }
      fetchLectureData()
    }
  }, [courseId, assignmentName])

  const fetchLectureSummary = async (data: string) => {
    const prompt = `Please summarize the following speech-to-text transcript of a lecture. Note that the transcription might have some inaccuracies. Here is the transcript:\n\n${data}\n\nSummary: `
    const apiResponse = await answersFromPrompt(prompt)
    setSummary(apiResponse)
  }

  if (!assignment) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-2 mx-auto h-full">
      <h1>{assignment.name}</h1>
      <div className="bg-white my-2 p-2 rounded-lg max-w-3xl">
        <p>
          <strong>Date:</strong> {assignment.date}
        </p>
        <p>
          <strong>Original:</strong> {assignment.data}
        </p>
        <br></br>
        <p>
          <strong>Summary:</strong>
        </p>
        <p>{summary}</p>
      </div>
      <AnswersFromPromptInput
        context={`Original: ${assignment.data}\n\nSummary: ${summary}\n\nUse the information in the Original and Summary sections to answer the query\n\n`}
      />
    </div>
  )
}

export default LecturePage
