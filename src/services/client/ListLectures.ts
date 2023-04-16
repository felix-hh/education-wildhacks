// services/client/getLecture.ts

import axios from "axios"

export async function listLectures(courseId: string) {
  try {
    const response = await axios.get(`/api/courses/${courseId}/lectures/`)
    console.log(response)

    const lectures = response.data

    return lectures
  } catch (error) {
    console.error("Error fetching lecture text:", error)
    return ""
  }
}
