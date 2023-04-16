// pages/courses/[courseId]/lectures/[lecture-name].tsx
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AnswersFromPromptInput } from "../../../../components/ListCourses/AnswersFromPromptInput"
import { getLectureData } from "../../../../services/client/GetLecture"
import { Lecture } from "../../../../model/DataModel"
import { answersFromPrompt } from "../../../../services/client/AnswersFromPrompt"
import { Button } from "antd"

const LecturePage = () => {
  const router = useRouter()
  const { id: courseId, lectureName } = router.query

  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [summary, setSummary] = useState("")

  const [transcriptExpanded, setTranscriptExpanded] = useState(false)

  const toggleTranscript = () => {
    setTranscriptExpanded(!transcriptExpanded)
  }

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
    const prompt = `Please summarize the following speech-to-text transcript of a lecture. Note that the transcription might have some inaccuracies. Here is the transcript:\n\n${transcript}\n\n. Summary: `
    const apiResponse = await answersFromPrompt(prompt)
    setSummary(apiResponse)
  }

  if (!lecture) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-2 mx-auto h-full">
      <h1>{lecture.name}</h1>
      <div className="bg-white my-2 p-2 rounded-lg max-w-3xl">
        <p>
          <strong>Date:</strong> {lecture.date}
        </p>
        <p>
          <strong>Transcript:</strong>{" "}
          {transcriptExpanded
            ? lecture.transcript
            : `${lecture.transcript.slice(0, 300)} (${Math.floor(
                lecture.transcript.length / 100
              )} more lines...)`}
        </p>
        <Button type="link" onClick={toggleTranscript}>
          {transcriptExpanded ? "Collapse Transcript" : "Expand Transcript"}
        </Button>
        <br></br>
        <p>
          <strong>Summary:</strong>
        </p>
        <p>{summary}</p>
      </div>
      <AnswersFromPromptInput
        context={`Transcript: ${lecture.transcript}\n\nSummary: ${summary}\n\nUse the information in the Transcript and Summary sections to answer the query\n\n`}
      />
    </div>
  )
}

export default LecturePage
