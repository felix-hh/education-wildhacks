import path from "path"
import fs from "fs"

export async function listAssignments(courseId: string): Promise<string[]> {
  const assignmentsDirectory = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "assignments"
  )
  const filenames = fs.readdirSync(assignmentsDirectory)
  const assignmentNames = filenames.map((filename) =>
    filename.replace(".json", "")
  )

  return assignmentNames.sort()
}
