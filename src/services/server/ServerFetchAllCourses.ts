import { canvasAPI } from "../resources/Canvas"

export async function serverFetchAllCourses() {
  try {
    let courses: any[] = []
    let currentPage = 1
    let hasMorePages = true

    while (hasMorePages) {
      const response = await canvasAPI.get("/courses/", {
        params: {
          enrollment_state: "active",
          page: currentPage,
          per_page: 50, // Set the number of items per page (max is 50),
        },
      })

      if (response.data.length > 0) {
        // courses = courses.concat(response.data.filter(course => course.enrollment_state === 'active'));
        courses = courses.concat(response.data)
        //courses = courses.filter(course => course.enrollment_state === 'active');
        currentPage++
      } else {
        hasMorePages = false
      }
    }
    courses = [
      ...courses.map((course) => {
        let courseName = course.name

        if (course.id === 18760000000118316) {
          courseName = "COMP_SCI_449 Deep Learning"
        }
        if (course.id === 18760000000189296) {
          courseName = "PHYSICS_390 Information Theory"
        }

        return { ...course, name: courseName }
      }),
    ]

    courses = [
      ...courses.filter((course) =>
        [
          18760000000118316, 18760000000189296, 18760000000189292,
          18760000000108550,
        ].includes(course.id)
      ),
    ]

    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}
