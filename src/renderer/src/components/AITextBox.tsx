import { ReactElement, useEffect, useState } from 'react'
import { useOpenAIPrompt } from '@renderer/api/AI/openAIFetcher'

export function AITextBox(): ReactElement {
  const [input, setInput] = useState('')
  const [lastInput, setLastInput] = useState<string | null>(null)
  const { data, isLoading, error, refetch } = useOpenAIPrompt({ input: lastInput ?? '' })

  useEffect(() => {
    if (lastInput !== null) {
      refetch()
    }
  }, [lastInput, refetch])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!input.trim()) return

    setLastInput(input)
    setInput('')
  }

  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
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
      <div className="text-sm text-black">{lastInput ? `Me: ${lastInput}` : ''}</div>
      {isLoading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-500">Error: {error.message}</div>}
      {data && <div className="text-sm text-black break-words">AI: {data}</div>}
    </div>
  )
}
