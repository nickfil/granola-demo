import { ReactElement, useEffect, useState } from 'react'
import { useOpenAIPrompt } from '@renderer/api/AI/openAIFetcher'

export function AITextBox({
  setInitiated,
  setAnswer,
  setQuestion,
  setTyping
}: {
  setInitiated: (initiated: boolean) => void
  setAnswer: (answer: string) => void
  setQuestion: (question: string) => void
  setTyping: (typing: boolean) => void
}): ReactElement {
  const [input, setInput] = useState<string | null>(null)
  const [lastInput, setLastInput] = useState<string | null>(null)
  const [previousResponseId, setPreviousResponseId] = useState<string | null>(
    localStorage.getItem('previousResponseId') ?? null
  )
  const { data, isLoading, refetch } = useOpenAIPrompt({
    input: lastInput ?? '',
    previousResponseId: previousResponseId ?? null
  })

  useEffect(() => {
    if (data) {
      localStorage.setItem('previousResponseId', data.id)
      setPreviousResponseId(data.id)
    }
  }, [data])

  useEffect(() => {
    if (lastInput !== null) {
      refetch()
    }
  }, [lastInput, refetch])

  useEffect(() => {
    if (data) {
      setAnswer(data.output_text)
    }
  }, [data, setAnswer])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!input?.trim()) return

    setLastInput(input)
    setQuestion(input)
    setInput('')
    setInitiated(true)
  }

  useEffect(() => {
    if (isLoading) {
      setTyping(true)
    } else {
      setTyping(false)
    }
  }, [isLoading, setTyping])

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full h-12">
      <input
        type="text"
        value={input ?? ''}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Yappa yappa yappa..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--granola-green)]"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[var(--granola-green)] text-black rounded-lg hover:bg-[rgb(128_238_104)] focus:outline-none focus:ring-2 focus:ring-[var(--granola-green)] cursor-pointer"
      >
        Send
      </button>
    </form>
  )
}
