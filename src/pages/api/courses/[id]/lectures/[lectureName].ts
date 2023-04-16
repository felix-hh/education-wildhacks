import { NextApiRequest, NextApiResponse } from "next"
import { getCourseMaterial } from "../../../../../services/server/ServerGetCourseMaterial"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, lectureName } = req.query
  console.log(courseId, lectureName)
  try {
    const lecture = await getCourseMaterial(
      courseId as string,
      lectureName as string,
      "lectures"
    )
    res.status(200).json({ lecture })
  } catch (error) {
    console.error("Error reading lecture text:", error)
    res.status(500).json({ error: "Error reading lecture text" })
  }
}
