import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { sendPrompt } from '../clients/openAIClient'

type OpenAIPromptProps = {
  input: string
}

export function useOpenAIPrompt({ input }: OpenAIPromptProps): UseQueryResult<string, Error> {
  return useQuery({
    queryKey: ['openai', input],
    queryFn: () => sendPrompt(input),
    enabled: false
  })
}
