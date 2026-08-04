import { generateAIResponse } from '../../services/geminiAPI.js'

export const getNoteRecommendation = async (req, res) => {
  try {
    const response = await generateAIResponse(req.body.prompt)
    return res.status(200).json({ data: response })
  } catch (error) {
    const status = error.status || error.statusCode || 400
    return res.status(status).json({ error: error.message || 'Unknown error.' })
  }
}