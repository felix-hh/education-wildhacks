import type { NextApiRequest, NextApiResponse } from "next"
import { listAssignments } from "../../../../../services/server/ServerListAssignments"

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

    const assignment = await listAssignments(courseId as string)

    if (!assignment) {
      res.status(404).json({ error: "Course not found." })
      return
    }

    res.status(200).json(assignment)
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
