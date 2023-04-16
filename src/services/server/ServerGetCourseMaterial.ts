import path from "path"
import fs from "fs"
import { Lecture } from "../../model/DataModel"

export async function getCourseMaterial(
  courseId: string,
  file_stem: string,
  category: string
): Promise<Lecture> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "database",
    "courses",
    courseId as string,
    category,
    `${file_stem}.json`
  )

  const lectureText = fs.readFileSync(filePath, "utf-8")
  const lectureData = JSON.parse(lectureText)
  console.log(lectureData)
  return lectureData
}
