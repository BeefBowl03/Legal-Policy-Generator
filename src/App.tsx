import { useState } from 'react'
import PolicyGenerator from './components/PolicyGenerator'
import { PolicyData } from './types'

function App() {
  const [, setPolicyData] = useState<PolicyData | null>(null)

  return (
    <div className="min-h-screen premium-gradient">
      <header className="bg-background-card/80 backdrop-blur-md shadow-premium border-b border-border-subtle">
        <div className="app-container">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-text-accent to-primary-400 bg-clip-text text-transparent">
                Legal Policy Generator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Generate professional legal policies for your business
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="app-container py-8">
        <div className="responsive-padding">
          <PolicyGenerator 
            setPolicyData={setPolicyData}
          />
        </div>
      </main>
    </div>
  )
}

export default App 