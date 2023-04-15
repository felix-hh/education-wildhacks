import axios from "axios"

export const canvasAPI = axios.create({
  baseURL: "https://canvas.instructure.com/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.CANVAS_API_KEY}`,
  },
})
