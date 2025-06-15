import { AITextBox } from './components/AITextBox'

function App(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-4 px-16">
      <h1 className="text-3xl font-bold">Ask me anything...</h1>
      <AITextBox />
    </div>
  )
}

export default App
