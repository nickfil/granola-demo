import OpenAI from 'openai'

export type OpenAIPromptResponse = {
  id: string
  output_text: string
}

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // whoops, sorrynotsorry
  dangerouslyAllowBrowser: true
})

export const sendPrompt = async (
  prompt: string,
  previousResponseId: string | null
): Promise<OpenAIPromptResponse> => {
  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: prompt,
    previous_response_id: previousResponseId ?? null
  })

  return {
    id: response.id,
    output_text: response.output_text
  }
}
