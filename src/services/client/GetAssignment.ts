import axios from "axios"

export async function getAssignmentData(
  courseId: string,
  assignmentName: string
) {
  try {
    const response = await axios.get(
      `/api/courses/${courseId}/assignments/${assignmentName}`
    )
    console.log(response)

    const text = response.data

    return text
  } catch (error) {
    console.error("Error fetching lecture text:", error)
    return ""
  }
}
