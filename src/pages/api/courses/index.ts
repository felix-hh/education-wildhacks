import type { NextApiRequest, NextApiResponse } from "next"
import { serverFetchAllCourses } from "../../../services/server/ServerFetchAllCourses"
import { Course, ListAllCoursesResponse } from "../../../model/DataModel"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListAllCoursesResponse>
) => {
  const data = await serverFetchAllCourses()

  const courses: Course[] = data.map((course) => ({
    id: course.id,
    name: course.name,
  }))

  console.log(courses)

  res.status(200).json({ courses })
}

export default handler
