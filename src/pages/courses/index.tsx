import { Avatar } from "antd"
import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import { listCourses } from "../../services/client/ListCourses"

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
  // const courseNames = [...props.courses.map((course) => course.name)]
  // const courseCodes = [...props.courses.map((course) => course.id)]

  // const [selectedCourseNames, setSelectedCourseNames] = useState<Set<string>>(
  //   new Set()
  // )
  // const [selectedCourseCodes, setSelectedCourseCodes] = useState<Set<string>>(
  //   new Set()
  // )

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
    // }, [fetchCourses, selectedCourseCodes, selectedCourseNames])
  }, [fetchCourses])

  return (
    <div className="w-fit xl:w-10/12 xl:mx-auto">
      <div className={styles.profileContainer}>
        <Link href="/recommendations">
          <a>
            <Avatar
              size={256}
              src="https://via.placeholder.com/256" // Replace this URL with your profile image URL
              alt="Profile"
              className={styles.profileImage}
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-row justify-start h-min flex-wrap">
        {courses.map((course: Course) => (
          <div className="" key={course.id}>
            <Link href={`/courses/${course.id}`}>
              <a>
                {course.name ? (
                  <div className="rounded-lg m-4 w-72 h-72 shadow-lg overflow-clip grid grid-rows-4 grid-flow-col">
                    <div className="row-span-3">
                      <img
                        src={getRandomColorImage()}
                        alt="Course"
                        className="h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="text-ellipsis">
                        {course.name.split(" ")[0]}
                      </h4>
                      <p className="text-ellipsis">
                        {course.name.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg m-4 w-72 h-72 shadow-lg overflow-clip grid grid-rows-4 grid-flow-col">
                    <h4 className="m-auto">No course name available</h4>
                  </div>
                )}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
