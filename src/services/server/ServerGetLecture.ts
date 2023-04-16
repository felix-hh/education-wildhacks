import path from "path"
import fs from "fs"
import { Lecture } from "../../model/DataModel"

export async function getLecture(
  courseId: string,
  lectureName: string
): Promise<Lecture> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    "lectures",
    `${lectureName}.json`
  )

  const lectureText = fs.readFileSync(filePath, "utf-8")
  const lectureData = JSON.parse(lectureText)
  console.log(lectureData)
  return lectureData
}
