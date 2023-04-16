import axios from "axios"

export async function listAssignments(courseId: string) {
  try {
    const response = await axios.get(`/api/courses/${courseId}/assignments/`)
    console.log(response)

    const assignments = response.data

    return assignments
  } catch (error) {
    console.error("Error fetching lecture text:", error)
    return ""
  }
}
