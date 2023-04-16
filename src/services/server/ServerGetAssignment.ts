import path from "path"
import fs from "fs"
import { Assignment } from "../../model/DataModel"
import AssignmentName from "../../pages/api/courses/[id]/assignments/[assignmentName]"

export async function getFile(
  courseId: string,
  assignmentName: string
): Promise<File> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "assignments",
    `${assignmentName}.json`
  )

  const fileText = fs.readFileSync(filePath, "utf-8")
  const assignmentData = JSON.parse(fileText)
  console.log(assignmentData)
  return assignmentData
}
