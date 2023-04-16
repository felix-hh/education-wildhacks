import type { NextApiRequest, NextApiResponse } from "next"
import { listLectures } from "../../../../../services/server/ServerListLectures"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const courseId = req.query.id

    if (!courseId) {
      res.status(400).json({ error: "Course ID is missing." })
      return
    }

    const course = await listLectures(courseId as string)

    if (!course) {
      res.status(404).json({ error: "Course not found." })
      return
    }

    res.status(200).json(course)
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
