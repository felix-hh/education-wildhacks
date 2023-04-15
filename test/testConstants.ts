import { Course } from "../src/model/DataModel"

export const mockCourses: Course[] = [
  {
    id: 18760000000098660,
    name: "2019FA_CHEM_171-0_SEC01 Advanced General Inorganic Chemistry",
  },
]

export const rawData: any[] = [
  {
    id: 18760000000098660,
    name: "2019FA_CHEM_171-0_SEC01 Advanced General Inorganic Chemistry",
    account_id: 18760000000000380,
    uuid: "9IXxUMka4wjyPfek3yvFiQv1A3aTdVEs1M07Ejs1",
    start_at: "2019-09-03T05:00:00Z",
    grading_standard_id: null,
    is_public: false,
    created_at: "2019-05-06T13:13:12Z",
    course_code: "2019FA_CHEM_171-0_SEC01",
    default_view: "modules",
    root_account_id: 18760000000000000,
    enrollment_term_id: 18760000000000164,
    license: "private",
    grade_passback_setting: null,
    end_at: "2020-05-07T05:00:00Z",
    public_syllabus: false,
    public_syllabus_to_auth: false,
    storage_quota_mb: 1024,
    is_public_to_auth_users: false,
    homeroom_course: false,
    course_color: null,
    friendly_name: null,
    apply_assignment_group_weights: false,
    calendar: {
      ics: "https://canvas.instructure.com/feeds/calendars/course_9IXxUMka4wjyPfek3yvFiQv1A3aTdVEs1M07Ejs1.ics",
    },

    time_zone: "America/Chicago",
    blueprint: false,
    template: false,
    enrollments: [
      {
        type: "student",
        role: "StudentEnrollment",
        role_id: 18760000000000108,
        user_id: 18760000000140812,
        enrollment_state: "active",
        limit_privileges_to_course_section: false,
      },
    ],
    hide_final_grades: false,
    workflow_state: "available",
    restrict_enrollments_to_course_dates: true,
    overridden_course_visibility: "",
  },
]
