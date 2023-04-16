import path from "path"
import fs from "fs"

export async function listFiles(courseId: string): Promise<string[]> {
  const filesDirectory = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "files"
  )
  const filenames = fs.readdirSync(filesDirectory)
  const fileNames = filenames.map((filename) => filename.replace(".json", ""))

  return fileNames.sort()
}
