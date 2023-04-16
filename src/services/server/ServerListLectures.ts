import path from "path"
import fs from "fs"

export async function listLectures(courseId: string): Promise<string[]> {
  const lecturesDirectory = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "lectures"
  )
  const filenames = fs.readdirSync(lecturesDirectory)
  const lectureNames = filenames.map((filename) =>
    filename.replace(".json", "")
  )

  return lectureNames.sort()
}
