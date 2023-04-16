// services/client/getLecture.ts

import axios from "axios"

export async function getLectureData(courseId: string, lectureName: string) {
  try {
    const response = await axios.get(
      `/api/courses/${courseId}/lectures/${lectureName}`
    )
    console.log(response)

    const text = response.data

    return text
  } catch (error) {
    console.error("Error fetching lecture text:", error)
    return ""
  }
}
