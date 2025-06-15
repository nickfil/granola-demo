import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // whoops, sorrynotsorry
  dangerouslyAllowBrowser: true
})

export const sendPrompt = async (prompt: string): Promise<string> => {
  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: prompt
  })

  return response.output_text
}
