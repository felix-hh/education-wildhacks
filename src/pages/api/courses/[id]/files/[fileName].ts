import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { getFile } from "../../../../../services/server/ServerGetFile"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId, fileName } = req.query
  console.log(courseId, fileName)
  try {
    const file = await getFile(courseId as string, fileName as string)
    res.status(200).json({ file })
  } catch (error) {
    console.error("Error reading file text:", error)
    res.status(500).json({ error: "Error reading file text" })
  }
}
