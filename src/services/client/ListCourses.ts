import axios from "axios"
import { Course, ListAllCoursesResponse } from "../../model/DataModel"
import { TableItem } from "../../model/TableModel"

export const listCourses = async (): Promise<TableItem<Course>[]> => {
  const request = {}
  const response = await axios.post("/api/courses", request)
  const json: ListAllCoursesResponse = response.data
  const courses = json.courses.map((item) => ({
    ...item,
    key: item.id.toString(),
  }))
  return courses
}
