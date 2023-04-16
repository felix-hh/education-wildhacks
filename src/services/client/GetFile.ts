import axios from "axios"

export async function getFileData(courseId: string, fileName: string) {
  try {
    const response = await axios.get(
      `/api/courses/${courseId}/files/${fileName}`
    )
    console.log(response)

    const text = response.data

    return text
  } catch (error) {
    console.error("Error fetching file text:", error)
    return ""
  }
}
