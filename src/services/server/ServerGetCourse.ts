import { canvasAPI } from "../resources/Canvas"

export async function fetchCourseFromCanvas(courseId: string) {
  try {
    const response = await canvasAPI.get(`/courses/${courseId}/`)
    console.log("course response")
    console.log(response)
    if (courseId === "18760000000118316") {
      response.data.name = "COMP_SCI 449 - Deep Learning"
    }
    if (courseId === "18760000000189296") {
      response.data.name = "PHYSICS 390 - Information Theory"
    }
    return response.data
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}
