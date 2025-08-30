import { useState } from 'react'
import PolicyGenerator from './components/PolicyGenerator'
import { PolicyData } from './types'

function App() {
  const [, setPolicyData] = useState<PolicyData | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Legal Policy Generator
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Generate professional legal policies for your business
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PolicyGenerator 
          setPolicyData={setPolicyData}
        />
      </main>
    </div>
  )
}

export default App 