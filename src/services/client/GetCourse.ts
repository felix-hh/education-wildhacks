import axios from "axios"
import { Course } from "../../model/DataModel"

export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const response = await axios.get(`/api/courses/${courseId}`, {})
    console.log(response)

    if (response.data) {
      const courseData: Course = {
        id: response.data.id,
        name: response.data.name,
      }
      return courseData
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error)
    return null
  }
}
