import { useRouter } from "next/router"
import { Card, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { Course } from "../../model/DataModel"
import { getCourseById } from "../../services/client/GetCourse"

const { Title } = Typography

const CoursePage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    console.log(id)
    if (id) {
      const fetchCourse = async () => {
        const courseData = await getCourseById(id as string)
        setCourse(courseData)
      }
      fetchCourse()
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
