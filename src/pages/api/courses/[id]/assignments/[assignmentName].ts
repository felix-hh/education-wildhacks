import { NextApiRequest, NextApiResponse } from "next"
import { getCourseMaterial } from "../../../../../services/server/ServerGetCourseMaterial"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, assignmentName } = req.query
  console.log(courseId, assignmentName)
  try {
    const assignmentData = await getCourseMaterial(
      courseId as string,
      assignmentName as string,
      "assignments"
    )
    res.status(200).json({ assignmentData })
  } catch (error) {
    console.error("Error reading lecture text:", error)
    res.status(500).json({ error: "Error reading lecture text" })
  }
}
