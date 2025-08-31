import { useState } from 'react'
import PolicyGenerator from './components/PolicyGenerator'
import { PolicyData } from './types'

function App() {
  const [, setPolicyData] = useState<PolicyData | null>(null)

  return (
    <div className="min-h-screen premium-gradient">
      <header className="bg-background-card/80 backdrop-blur-md shadow-premium border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 sm:py-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-text-accent to-primary-400 bg-clip-text text-transparent">
                Legal Policy Generator
              </h1>
              <p className="mt-2 text-base sm:text-lg text-text-secondary">
                Generate professional legal policies for your business
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PolicyGenerator 
          setPolicyData={setPolicyData}
        />
      </main>
    </div>
  )
}

export default App 