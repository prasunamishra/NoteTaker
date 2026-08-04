import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config({ path: '../.env' });
dotenv.config();

const SystemInstruction = `You are a helpful assistant for a note-taking app.

RULES:
1. If the user wants to create, edit, summarize, organize, search, categorize, or improve notes, respond with the requested note content only.
2. If the user asks a general question, answer it briefly and helpfully.
3. Keep replies concise and useful. No greetings or extra explanation unless needed.
4. If the user asks for a note and the request is unclear, offer a short suggestion.`;

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const generateAIResponse = async (prompt) => {
  const trimmedPrompt = `${prompt ?? ''}`.trim();

  if (!trimmedPrompt) {
    return 'Please provide a prompt or question for the AI.';
  }

  if (!process.env.GROQ_API_KEY) {
    return 'AI is not configured yet. Please add GROQ_API_KEY to the backend environment to enable AI responses.';
  }

  try {
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SystemInstruction },
        { role: 'user', content: trimmedPrompt },
      ],
      temperature: 0.2,
      max_tokens: 400,
    });

    return response.choices?.[0]?.message?.content?.trim() || 'I could not generate a response right now.';
  } catch (error) {
    console.error('Groq AI request failed:', error.message || error);
    return 'The AI service is temporarily unavailable. Please try again in a moment.';
  }
};