import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { getAssignment } from "../../../../../services/server/ServerGetAssignment"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, assignmentName } = req.query
  console.log(courseId, assignmentName)
  try {
    const assignment = await getAssignment(
      courseId as string,
      assignmentName as string
    )
    res.status(200).json({ assignment })
  } catch (error) {
    console.error("Error reading lecture text:", error)
    res.status(500).json({ error: "Error reading lecture text" })
  }
}
