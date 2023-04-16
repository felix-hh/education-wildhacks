import { useRouter } from "next/router"
import fs from "fs"
import path from "path"
import { Card, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { Course } from "../../model/DataModel"
import { getCourseById } from "../../services/client/GetCourse"
import Link from "next/link"
import { listLectures } from "../../services/client/ListLectures"

const { Title } = Typography

const CoursePage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState<Course | null>(null)
  const [lectures, setLectures] = useState<string[]>([])

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
      fetchCourse()
      fetchLectures()
    }
  }, [id])

  return (
    <>
      {course && (
        <>
          <Title>{course.name}</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Lectures" bordered>
                {/* Add content related to lectures */}
                {lectures.map((lecture) => (
                  <>
                    <Link href={`/courses/${id}/lectures/${lecture}`}>
                      {lecture}
                    </Link>
                    <br />
                  </>
                ))}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Feedback" bordered>
                {/* Add content related to feedback */}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Files" bordered>
                {/* Add content related to files */}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CoursePage
