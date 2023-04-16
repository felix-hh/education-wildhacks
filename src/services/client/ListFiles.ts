import axios from "axios"

export async function listFiles(courseId: string) {
  try {
    const response = await axios.get(`/api/courses/${courseId}/files/`)
    console.log(response)

    const files = response.data

    return files
  } catch (error) {
    console.error("Error fetching file text:", error)
    return ""
  }
}
