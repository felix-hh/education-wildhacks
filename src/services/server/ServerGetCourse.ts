import { canvasAPI } from "../resources/Canvas"

export async function fetchCourseFromCanvas(courseId: string) {
  try {
    const response = await canvasAPI.get(`/courses/${courseId}/`)
    console.log("course response")
    console.log(response)
    return response.data
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}
