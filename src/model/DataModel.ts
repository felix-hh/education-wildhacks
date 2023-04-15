export type Course = {
  id: number
  name: string
}

export type ListAllCoursesResponse = {
  courses: Course[]
}

export type AnswerFromPromptResponse = {
  modelResponse: string
}
