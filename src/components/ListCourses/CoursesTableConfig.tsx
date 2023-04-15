import { TableColumnsType } from "antd"
import { getDefaultCompareFn } from "../../utils/TableUtils"
import { Course } from "../../model/DataModel"

export const coursesColumnDefinitions: TableColumnsType<Course> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    align: "right",
    width: 120,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Course Name",
    dataIndex: "name",
    key: "name",
    width: 80,
    sorter: getDefaultCompareFn("name"),
  },
]
