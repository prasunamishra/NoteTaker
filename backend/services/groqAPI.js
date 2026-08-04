import OpenAI from 'openai';

const SystemInstruction = `You are a note-taking assistant for a Note Taker App. Your ONLY job is to help users create, edit, summarize, organize, search, and categorize notes. You must never do anything else.

RULES:
1. Only respond to requests related to notes (creating, editing, summarizing, organizing, categorizing, searching, or formatting notes).
2. When creating a note, return only the note title and note content.
3. When summarizing a note, return only the summary.
4. When organizing notes, suggest appropriate categories or tags based on the content.
5. If the user asks to improve or rewrite a note, return only the updated note.
6. If the user asks something unrelated to note management (general chat, coding help, math, weather, etc.), reply in one line: "I can only assist with note-related tasks. Please provide a note or tell me what you'd like to do with your notes."
7. Be concise. No greetings, no unnecessary explanations, and no extra context. Output only the requested note-related content.`;

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const generateAIResponse = async (prompt) => {
  const response = await client.responses.create({
    model: 'openai/gpt-oss-20b',
    input: `${SystemInstruction}\n\nUser request: ${prompt}`,
     system_instruction: SystemInstruction,
  });

  return response.output_text;
};