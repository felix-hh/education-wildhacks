import { NextApiRequest, NextApiResponse } from "next"
import { getCourseMaterial } from "../../../../../services/server/ServerGetCourseMaterial"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, fileName } = req.query
  console.log(courseId, fileName)
  try {
    const fileData = await getCourseMaterial(
      courseId as string,
      fileName as string,
      "files"
    )
    res.status(200).json({ fileData })
  } catch (error) {
    console.error("Error reading lecture text:", error)
    res.status(500).json({ error: "Error reading lecture text" })
  }
}
