// pages/study-plan.tsx
import { Table, Calendar } from "antd"
import { ColumnsType } from "antd/es/table"
import moment from "moment"
import { studyPlan } from "../../database/mockStudyPlanData"

type StudyPlanItem = {
  subject: string
  learningGoal: string
  studyTime: string
  deadline: string
}

const columns: ColumnsType<StudyPlanItem> = [
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    filters: [
      { text: "Math", value: "Math" },
      { text: "History", value: "History" },
      // Add more filters for other subjects
    ],
    onFilter: (value, record) => record.subject.indexOf(value as string) === 0,
  },
  {
    title: "Learning Goal",
    dataIndex: "learningGoal",
    key: "learningGoal",
    sorter: (a, b) => a.learningGoal.localeCompare(b.learningGoal),
  },
  {
    title: "Study Time",
    dataIndex: "studyTime",
    key: "studyTime",
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
    sorter: (a, b) => moment(a.deadline).unix() - moment(b.deadline).unix(),
  },
]

const StudyPlanPage = () => {
  return (
    <div>
      <h1>Study Plan</h1>
      <Table<StudyPlanItem>
        dataSource={studyPlan}
        columns={columns}
        pagination={false}
        rowKey="subject"
      />
      <h2>Deadlines Calendar</h2>
      <Calendar
        dateCellRender={(value) => {
          const deadlines = studyPlan.filter((item) =>
            moment(item.deadline).isSame(value, "day")
          )
          return (
            <ul className="deadlines">
              {deadlines.map((item) => (
                <li key={item.subject}>
                  {item.subject}: {item.learningGoal}
                </li>
              ))}
            </ul>
          )
        }}
      />
    </div>
  )
}

export default StudyPlanPage
