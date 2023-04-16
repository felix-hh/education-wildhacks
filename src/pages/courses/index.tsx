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
    <div className="w-full">
      <div className="mx-auto max-w-3xl h-fit bg-slate-400 flex flex-row gap-4 m-2 rounded-full shadow-sm border-2 border-blue-200">
        <Link href="/recommendations">
          <a>
            <Avatar
              size={256}
              src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" // Replace this URL with your profile image URL
              alt="Profile"
              className="border-r-2 border-blue-200"
            />
          </a>
        </Link>
        <div className="my-auto pr-16 w-96">
          <p className="text-2xl">Name</p>
          <p>Email</p>
          <p>Canvas Token</p>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit justify-items-center mx-auto">
        {courses.map((course: Course) => (
          <div className="" key={course.id}>
            <Link href={`/courses/${course.id}`}>
              <a>
                {course.name ? (
                  <div className="rounded-lg m-4 w-64 h-72 shadow-lg overflow-clip grid grid-rows-4 grid-flow-col w-fit">
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
