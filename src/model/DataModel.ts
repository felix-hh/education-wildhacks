export type Course = {
  id: number
  name: string
}

export type Lecture = {
  name: string
  date: string
  transcript: string
}

export type ListAllCoursesResponse = {
  courses: Course[]
}

export type AnswerFromPromptResponse = {
  modelResponse: string
}
