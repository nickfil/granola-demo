import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { OpenAIPromptResponse, sendPrompt } from '../clients/openAIClient'

type OpenAIPromptProps = {
  input: string
  previousResponseId: string | null
}

export function useOpenAIPrompt({
  input,
  previousResponseId
}: OpenAIPromptProps): UseQueryResult<OpenAIPromptResponse, Error> {
  return useQuery({
    queryKey: ['openai', input],
    queryFn: () => sendPrompt(input, previousResponseId),
    enabled: false
  })
}
