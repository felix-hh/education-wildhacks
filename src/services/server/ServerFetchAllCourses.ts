import { canvasAPI } from "../resources/Canvas"
export async function serverFetchAllCourses() {
  try {
    let courses: any[] = []

    const response = await canvasAPI.get("/courses/", {
      params: {},
    })
    // ### TODO: remove
    console.log("this is the response")
    console.log(response.data[0])

    courses = response.data

    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}
