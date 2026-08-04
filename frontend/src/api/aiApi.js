import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api/ai`,
  withCredentials: true,
})

export function generateRecommendation(prompt) {
  return api.post('/generaterecommendation', { prompt }).then((response) => response.data)
}
