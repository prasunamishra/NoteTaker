import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api/ai`,
  withCredentials: true,
})

export async function generateRecommendation(prompt) {
  const response = await api.post('/generaterecommendation', { prompt })
  return response.data?.data ?? response.data ?? ''
}
