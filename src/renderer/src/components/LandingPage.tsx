import { useEffect, useState } from 'react'
import { AITextBox } from './AITextBox'
import { Message, Messages, MessagingRole } from './Messages'

export function LandingPage(): React.JSX.Element {
  const [question, setQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>(
    localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')!) : []
  )
  const [typing, setTyping] = useState(false)
  const [initiated, setInitiated] = useState(!!messages)

  useEffect(() => {
    if (typing) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant' as MessagingRole,
            content: 'Thinking...',
            timestamp: new Date()
          }
        ])
      }, 500)
    }
  }, [typing])

  useEffect(() => {
    if (!answer) return
    setMessages((prev) => {
      const newMessages = [
        ...prev.slice(0, -1),
        {
          id: crypto.randomUUID(),
          role: 'assistant' as MessagingRole,
          content: answer,
          timestamp: new Date()
        }
      ]
      localStorage.setItem('messages', JSON.stringify(newMessages))
      return newMessages
    })
  }, [answer])

  useEffect(() => {
    if (!question) return
    setMessages((prev) => {
      const newMessages = [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'user' as MessagingRole,
          content: question,
          timestamp: new Date()
        }
      ]
      localStorage.setItem('messages', JSON.stringify(newMessages))
      return newMessages
    })
  }, [question])

  const handleNewChat = (): void => {
    setInitiated(false)
    setMessages([])
  }

  return (
    <div className="flex flex-col h-screen w-screen p-8">
      {initiated && (
        <button
          className="px-2 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300 cursor-pointer w-24 self-start text-sm"
          onClick={handleNewChat}
        >
          New chat
        </button>
      )}
      {initiated && <Messages messages={messages} />}
      <div
        className={`flex flex-col ${initiated ? 'justify-end' : 'justify-center'} items-center w-full gap-4`}
      >
        {!initiated && <h1 className="text-3xl font-bold">Ask me anything...</h1>}
        <AITextBox
          setInitiated={setInitiated}
          setAnswer={setAnswer}
          setQuestion={setQuestion}
          setTyping={setTyping}
        />
      </div>
    </div>
  )
}
