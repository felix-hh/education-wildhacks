// pages/study-plan.tsx
import { Table, Calendar, Modal, List } from "antd"
import { ColumnsType } from "antd/es/table"
import moment from "moment"
import { studyPlan } from "../../database/mockStudyPlanData"
import { useState } from "react"

type StudyPlanItem = {
  subject: string
  learningGoal: string
  studyTime: string
  deadline: string
  guidelines: string
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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDeadline, setSelectedDeadline] =
    useState<StudyPlanItem | null>(null)

  const showModal = (item: StudyPlanItem) => {
    setSelectedDeadline(item)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <h1>Study Plan</h1>
      <h2>Today</h2>
      <List
        dataSource={[
          "Look at chapter 3, page 40, in the history textbook to learn more about the Spanish battle against the British.",
          "Look at minute 32 of Lecture 10 to learn more about clustered embeddings.",
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{
          backgroundColor: "#f0f2f5",
          borderRadius: "6px",
          padding: "12px",
        }}
      />
      {/* <ul>
        <li>Look at chapter 3, page 40, in the history textbook to learn more about the Spanish battle against the British.</li>
        <li>Look at minute 32 of Lecture 10 to learn more about clustered embeddings.</li>
      </ul> */}
      <Table<StudyPlanItem>
        dataSource={studyPlan as any}
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
        onSelect={(value) => {
          const deadline = studyPlan.find((item) =>
            moment(item.deadline).isSame(value, "day")
          )
          if (deadline) {
            showModal(deadline as any)
          }
        }}
      />
      {selectedDeadline && (
        <Modal
          title={`${selectedDeadline.subject}: ${selectedDeadline.learningGoal}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{selectedDeadline.guidelines}</p>
        </Modal>
      )}
    </div>
  )
}

export default StudyPlanPage
