import { canvasAPI } from "../resources/Canvas"

export async function serverFetchAllCourses() {
  try {
    let courses: any[] = []
    let currentPage = 1
    let hasMorePages = true

    while (hasMorePages) {
      const response = await canvasAPI.get("/courses/", {
        params: {
          // enrollment_state: 'active',
          page: currentPage,
          per_page: 50, // Set the number of items per page (max is 50),
        },
      })

      if (response.data.length > 0) {
        // courses = courses.concat(response.data.filter(course => course.enrollment_state === 'active'));
        courses = courses.concat(response.data)
        currentPage++
      } else {
        hasMorePages = false
      }
    }

    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}
