import { useRouter } from "next/router"
import { Card, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { Course } from "../../model/DataModel"
import { getCourseById } from "../../services/client/GetCourse"
import Link from "next/link"
import { listLectures } from "../../services/client/ListLectures"
import { listAssignments } from "../../services/client/ListAssignments"
import { listFiles } from "../../services/client/ListFiles"

const { Title } = Typography

const CoursePage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState<Course | null>(null)
  const [lectures, setLectures] = useState<string[]>([])
  const [files, setFiles] = useState<string[]>([])
  const [assignments, setAssignments] = useState<string[]>([])

  useEffect(() => {
    console.log(id)
    if (id) {
      const fetchCourse = async () => {
        const courseData = await getCourseById(id as string)
        setCourse(courseData)
      }
      const fetchLectures = async () => {
        const allLectures = await listLectures(id as string)
        setLectures([...allLectures])
      }
      const fetchFiles = async () => {
        const allFiles = await listFiles(id as string)
        setFiles([...allFiles])
      }

      const fetchAssignments = async () => {
        const allAssignments = await listAssignments(id as string)
        setAssignments([...allAssignments])
      }

      fetchCourse()
      fetchLectures()
      fetchFiles()
      fetchAssignments()
    }
  }, [id])

  return (
    <>
      {course && (
        <div className="p-4 h-max">
          <h1 className="mx-2">{course.name}</h1>
          <div className="grid grid-cols-3 grid-flow-row gap-8">
            <div className="flex flex-col rounded-lg overflow-clip border-2 p-2 bg-white gap-4">
              <h3 className="border-spacing border-b-2 pb-1 mb-1">Lectures</h3>
              {/* Add content related to lectures */}
              {lectures.map((lecture) => (
                <Link href={`/courses/${id}/lectures/${lecture}`} key={lecture}>
                  <div className="bg-slate-200 hover:bg-slate-300 p-2 rounded-md flex justify-between">
                    <p>{lecture}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col rounded-lg overflow-clip border-2 p-2 bg-white gap-4">
              <h3 className="border-spacing border-b-2 pb-1 mb-1">Files</h3>
              {/* Add content related to lectures */}
              {files.map((file) => (
                <Link href={`/courses/${id}/files/${file}`} key={file}>
                  <div className="bg-slate-200 hover:bg-slate-300 p-2 rounded-md flex justify-between">
                    <p>file</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col rounded-lg overflow-clip border-2 p-2 bg-white gap-4">
              <h3 className="border-spacing border-b-2 pb-1 mb-1">Files</h3>
              {/* Add content related to lectures */}
              {assignments.map((feedback) => (
                <Link href={`/courses/${id}/files/${feedback}`} key={feedback}>
                  <div className="bg-slate-200 hover:bg-slate-300 p-2 rounded-md flex justify-between">
                    <p>feedback</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CoursePage
