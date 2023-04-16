import path from "path"
import fs from "fs"
import { File } from "../../model/DataModel"

export async function getFile(
  courseId: string,
  fileName: string
): Promise<File> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "files",
    `${fileName}.json`
  )

  const fileText = fs.readFileSync(filePath, "utf-8")
  const fileData = JSON.parse(fileText)
  console.log(fileData)
  return fileData
}
