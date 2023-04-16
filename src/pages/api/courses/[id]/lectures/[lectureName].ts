import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { getLecture } from "../../../../../services/server/ServerGetLecture"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, lectureName } = req.query
  console.log(courseId, lectureName)
  try {
    const lecture = await getLecture(courseId, lectureName)
    res.status(200).json({ lecture })
  } catch (error) {
    console.error("Error reading lecture text:", error)
    res.status(500).json({ error: "Error reading lecture text" })
  }
}
