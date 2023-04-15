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
    <Row>
      <Space direction="vertical">
        <Space align="center" direction="horizontal" size={[100, 0]}>
          <Card
            title={
              <Space direction="vertical" size={[1, 10]}>
                <h2>
                  {`Courses`}
                  <span className="counter">{` (${courses.length}${
                    courses.length === PAGE_SIZE_LIST_COURSES ? "+" : ""
                  })`}</span>{" "}
                </h2>
                <Collapse
                  bordered={false}
                  expandIconPosition="right"
                  expandIcon={() => (
                    <SearchOutlined
                      style={{ fontSize: "18px", marginRight: "8px" }}
                    />
                  )}
                >
                  <Collapse.Panel header={<span>Type a question</span>} key="1">
                    <AnswersFromPromptInput />
                  </Collapse.Panel>
                </Collapse>
                <small>This is the table description</small>

                <Row>
                  <Col span={12}>
                    <Select
                      placeholder="Ask a question"
                      showSearch
                      mode="multiple"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        setSelectedCourseCodes(new Set([...value]))
                      }
                    >
                      {courseCodes
                        .filter((item) => !selectedCourseCodes.has(item))
                        .map((item) => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <Select
                      placeholder="Search courses..."
                      showSearch
                      mode="multiple"
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setSelectedCourseNames(new Set([...value]))
                      }}
                    >
                      {courseNames
                        .filter((item) => !selectedCourseNames.has(item))
                        .map((item) => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </Row>
              </Space>
            }
            bordered
          >
            <Table
              dataSource={courses}
              columns={coursesColumnDefinitions}
              rowKey={"id"}
            />
          </Card>
        </Space>
      </Space>
    </Row>
  )
}
export default Courses
