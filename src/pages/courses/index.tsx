import { Avatar } from "antd"
import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import { listCourses } from "../../services/client/ListCourses"

import { serverFetchAllCourses } from "../../services/server/ServerFetchAllCourses"
import { Course } from "../../model/DataModel"
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
        <Link href="/study-plan">
          <a>
            <Avatar
              size={256}
              src="https://media.istockphoto.com/id/966521024/photo/student-going-for-the-lecture.jpg?s=612x612&w=0&k=20&c=p3eDUEdSlCLgmkaL1dRyjgTQidkvg_jEf4TQqpJOe2I=" // Replace this URL with your profile image URL
              alt="Profile"
              className="border-r-2 border-blue-200"
            />
          </a>
        </Link>
        <div className="my-auto pr-16 w-96">
          <p className="text-2xl">Ava</p>
          <p>avacaitlyn@u.northwestern.edu</p>
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
                    <div className="p-2 w-64">
                      <h4 className="text-ellipsis whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {course.name.split(" ")[0]}
                      </h4>
                      <p className="text-ellipsis whitespace-nowrap overflow-ellipsis overflow-hidden">
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
