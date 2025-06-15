import { ChatBubble } from './ChatBubble'

export type MessagingRole = 'user' | 'assistant'

export type Message = {
  id: string
  role: MessagingRole
  content: string
  timestamp: Date
}

export function Messages({ messages }: { messages: Message[] }): React.JSX.Element {
  console.log({ messages })
  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto my-4">
      {messages.map((message) => (
        <ChatBubble key={message.id} role={message.role} content={message.content} />
      ))}
    </div>
  )
}
