import { Card, Col, Row, Select, Space, Table, Collapse } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import { coursesColumnDefinitions } from "../../components/ListCourses/CoursesTableConfig"
import { listCourses } from "../../services/client/ListCourses"
import { PAGE_SIZE_LIST_COURSES } from "../../utils/AppConstants"

import { AnswersFromPromptInput } from "../../components/ListCourses/AnswersFromPromptInput"
import { serverFetchAllCourses } from "../../services/server/ServerFetchAllCourses"
import { Course } from "../../model/DataModel"
import styles from "../../styles/CourseCard.module.css"
import Link from "next/link"

type CoursesProps = {
  courses: Course[]
}

export const getStaticProps = async (): Promise<{
  props: CoursesProps
}> => {
  const courses = await serverFetchAllCourses()
  return {
    props: {
      courses,
    },
  }
}

const getRandomColorImage = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `https://via.placeholder.com/250x166/${randomColor}/${randomColor}`
}

const Courses: NextPage<CoursesProps> = (props) => {
  const [courses, setCourses] = useState(props.courses)
  const courseNames = [...props.courses.map((course) => course.name)]
  const courseCodes = [...props.courses.map((course) => course.id)]

  const [selectedCourseNames, setSelectedCourseNames] = useState<Set<string>>(
    new Set()
  )
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<Set<string>>(
    new Set()
  )

  const fetchCourses = useCallback(() => {
    const fetchData = async () => {
      const data = await listCourses()
      setCourses(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses()
    }
    fetchData()
  }, [fetchCourses, selectedCourseCodes, selectedCourseNames])

  return (
    <div className={styles.coursesGridContainer}>
      <div className={styles.coursesGridContainer}>
        <Row gutter={[24, 24]} justify="center">
          {courses.map((course: Course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
              <Link href={`/Courses/${course.id}`}>
                <a>
                  {course.name ? (
                    <Card className={styles.courseCard}>
                      <img
                        src={getRandomColorImage()}
                        alt="Course"
                        className={styles.courseCardImage}
                      />
                      <div className={styles.courseCardHeader}>
                        <h4>{course.name.split(" ")[0]}</h4>
                        <p>{course.name.split(" ").slice(1).join(" ")}</p>
                      </div>
                    </Card>
                  ) : (
                    <Card className={styles.courseCard}>
                      <p>No course name available</p>
                    </Card>
                  )}
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
export default Courses
