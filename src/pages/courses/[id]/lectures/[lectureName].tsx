// pages/courses/[courseId]/lectures/[lecture-name].tsx
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AnswersFromPromptInput } from "../../../../components/ListCourses/AnswersFromPromptInput"
import { getLectureData } from "../../../../services/client/GetLecture"
import { Lecture } from "../../../../model/DataModel"
import { answersFromPrompt } from "../../../../services/client/AnswersFromPrompt"

const LecturePage = () => {
  const router = useRouter()
  const { id: courseId, lectureName } = router.query

  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [summary, setSummary] = useState("")

  useEffect(() => {
    if (courseId && lectureName) {
      const fetchLectureData = async () => {
        const { lecture } = await getLectureData(
          courseId as string,
          lectureName as string
        )
        setLecture(lecture)
        await fetchLectureSummary(lecture.transcript)
      }
      fetchLectureData()
    }
  }, [courseId, lectureName])

  const fetchLectureSummary = async (transcript: string) => {
    const prompt = `Please summarize the following speech-to-text transcript of a lecture. Note that the transcription might have some inaccuracies. Here is the transcript:\n\n${transcript}\n\nSummary: `
    const apiResponse = await answersFromPrompt(prompt)
    setSummary(apiResponse)
  }

  if (!lecture) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{lecture.name}</h1>
      <p>Date: {lecture.date}</p>
      <p>Transcript: {lecture.transcript}</p>
      <p>Summary: {summary}</p>
      <AnswersFromPromptInput
        context={`Transcript: ${lecture.transcript}\n\nSummary: ${summary}\n\nUse the information in the Transcript and Summary sections to answer the query\n\n`}
      />
    </div>
  )
}

export default LecturePage
