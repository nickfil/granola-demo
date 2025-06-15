import { MessagingRole } from './Messages'

export function ChatBubble({
  role,
  content
}: {
  role: MessagingRole
  content: string
}): React.JSX.Element {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-2 rounded-t-xl rounded-bl-xl ${role === 'user' ? 'bg-gray-200' : 'bg-white'}`}
      >
        {content}
      </div>
    </div>
  )
}
